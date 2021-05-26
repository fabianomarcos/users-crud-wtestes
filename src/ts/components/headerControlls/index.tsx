// types 
import PropsInterface from "./types";

const HeaderControlls = (props: PropsInterface) => {
    return (
       <div>
           <button onClick={() => props.onCreate()}>Adicionar</button>
       </div>
    );
}

export default HeaderControlls;
