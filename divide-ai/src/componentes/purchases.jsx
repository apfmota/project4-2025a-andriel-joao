import { Box, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const Purchases = ({purchases}) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
            mt: 8,
            px: 2,
            pb: 10,
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                mt: 8,
                px: 2,
                pb: 10,
                maxHeight: 'calc(100vh - 64px)',
                overflowY: 'auto',
                }}
            >
                {purchases.length != 0 ? (
                purchases.map((purchase, idx) => (
                    <Box
                    onClick={() => navigate('/view-purchase', { state: { purchaseId: purchase.id } })}
                    key={idx}
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'white',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                    }}
                    >
                    <Typography variant="subtitle1" fontWeight="bold">
                        {purchase.storeName}
                    </Typography>
                    <Typography variant="body2">Data de Emissão: {purchase.purchaseDate}</Typography>
                    <Typography variant="body2">Data do Scan: {purchase.scanDate}</Typography>
                    <Typography variant="body2">Devedores: {purchase.payers.length}</Typography>
                    <Typography variant="body2">Total: R$ {purchase.totalValue}</Typography>
                    </Box>
                ))
                ) : (
                <Box
                    sx={{
                    mt: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    color: '#666',
                    }}
                >
                    <Typography variant="h6" fontSize={32} fontFamily={"'Jersey 15'"} color='#006bff'>
                    Nada aqui ainda...
                    </Typography>
                    <Typography variant="body2" fontSize={20} fontFamily={"'Jersey 15'"} color='#006bff'>Adicione uma Nota Fiscal!</Typography>
                </Box>
                )}
            </Box>
        </Box>
    )
}

export default Purchases;