import { Helmet } from "react-helmet-async"
import SppView from "src/sections/spp/view/sppview"

const SppPage = () => {
  return(
    <>
      <Helmet>
        <title>Spp | Data</title>
      </Helmet>

      <SppView />
    </>
  )
}

export default SppPage