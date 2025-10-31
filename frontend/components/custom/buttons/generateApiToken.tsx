'use client';

import { Button } from '@/components/ui/button';
import getToken from '@/lib/getToken';
import { useTokenStore } from '@/store/token';

export default function GenerateApiTokenButton() {
    const { setToken } = useTokenStore();
    const getTokenAndStore = async () => {
        const token = await getToken();
        setToken(token);
    };
    return (
        <Button
            onClick={getTokenAndStore}
            className="transition-all transform duration-200 hover:rounded-2xl bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800"
        >
            Generate API Token
        </Button>
    );
}
