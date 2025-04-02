import camon from "./img/camon.png"

function CamOn() {
    document.title="Thanks";
    return (
        <div className="camon" style={{textAlign:'center'}}>
                <div style={{margin:'10px'}}>
                <img style={{width:'100%',height:'100%'}} src={camon} alt={camon}/>
                </div>
        </div>
    );
}

export default CamOn;