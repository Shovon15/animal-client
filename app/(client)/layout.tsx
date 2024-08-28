import React from "react";

type Props = {
	children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
	return (
		<div className="min-h-screen bg-primary">
			<>{children}</>
		</div>
	);
};

export default ClientLayout;
