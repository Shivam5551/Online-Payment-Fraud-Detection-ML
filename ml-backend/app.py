import pandas as pd
import xgboost as xgb
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

class TransactionInput(BaseModel):
    step: int
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    transaction_type: str
    

model = xgb.XGBClassifier()
model.load_model("model.json")

model_columns = [
    'step',
    'amount',
    'oldbalanceOrg',
    'newbalanceOrig',
    'oldbalanceDest',
    'newbalanceDest',
    'isFlaggedFraud',  
    'type_CASH_OUT',
    'type_DEBIT',
    'type_PAYMENT',
    'type_TRANSFER'
]

app = FastAPI()

@app.post("/predict")
async def predict_fraud(data: TransactionInput):
    
    input_dict = data.dict()
    
    input_dict['type'] = input_dict.pop('transaction_type')
    input_df = pd.DataFrame([input_dict])

    
    input_df = pd.get_dummies(input_df, columns=['type'])

    
    input_df = input_df.reindex(columns=model_columns, fill_value=0)

    fraud_probability = model.predict_proba(input_df)[0][1]

    is_fraud_native = bool(fraud_probability > 0.4) 
    probability_native = float(fraud_probability)

    return {"is_fraud": is_fraud_native, "probability": probability_native}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)