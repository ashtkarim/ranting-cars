import { useParams } from "react-router-dom"


const CarInfo = () => {
    const {id} = useParams()
return(
    <>
    {id}
    </>
)
}
export default CarInfo