export const LoadingComponent = () => {
	return (
		<div className="bg-dark" style={{paddingTop:'300px', paddingBottom:'300px'}}>
			<div className="d-flex align-items-center justify-content-center h-100">
				<div className="spinner-border text-primary" style={{ width: '4rem', height:'4rem'}} role="status" />
			</div>
			<p className="text-center h5 mt-3 text-light">Đang tải...</p>
		</div>
	);
};

export default LoadingComponent;