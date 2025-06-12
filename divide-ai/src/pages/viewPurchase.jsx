import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { backendServerUrl } from "../config/backendIntegration";
import NFCDataGrid from "../componentes/nfcgrid";
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from "../util/sidebar";

const ViewPurchase = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [purchase, setPurchase] = useState(null);
	const location = useLocation();
	const { purchaseId } = location.state || {};
	
	useEffect(() => {
		const effect = async () => {
			const purchaseData = await axios.get(backendServerUrl + "/purchase?id=" + purchaseId, { withCredentials: true });
			console.log(purchaseData.data);
			setPurchase(purchaseData.data);
		}
		effect();
	}, [])


	return (
		<>	
			<Box sx={{ mt: 10, px: 2}}>
	
				<AppBar position="fixed" sx={{ backgroundColor: "#006bff" }}>
					<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={() => setDrawerOpen(true)}
					>
						<MenuIcon sx={{ fontSize: 32 }} />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						fontFamily={"'Jersey 15'"}
						fontSize={32}
					>
						tabela
					</Typography>
					</Toolbar>
				</AppBar>

				<Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
				
				{purchase && (
					<NFCDataGrid 
						data={purchase.items} 
						peopleNames={purchase.payers} 
						totalValue={purchase.totalValue} 
						numPeople={purchase.payers.lenght}
					></NFCDataGrid>
				)}
			</Box>
		</>
	)
}

export default ViewPurchase;