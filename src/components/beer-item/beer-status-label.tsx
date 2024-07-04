import { useState } from "react";
import { BeerStatus, BeerStatusColor } from "../../const";

type LabelProps = {
  status: BeerStatus;
  className: string;
}

export function BeerStatusLabel({status, className}: LabelProps): JSX.Element {
  const [infoShowed, setInfoShowed] = useState(false);

  return (
    <div className="product__status-wrapper">
      <span className={className} role="button" onClick={() => setInfoShowed(!infoShowed)}>
        {status}
      </span>
      {
        status !== BeerStatus.Unavailable &&
        <span className={`product__status-info ${infoShowed ? 'product__status-info--showed' : ''}`} style={
          status === BeerStatus.Fermentation ? {
            backgroundColor: BeerStatusColor.Fermentation[0],
            color: BeerStatusColor.Fermentation[1],
            opacity: 0.88
          } : status === BeerStatus.Maturation ? {
            backgroundColor: BeerStatusColor.Maturation[0],
            color: BeerStatusColor.Maturation[1],
            opacity: 0.88
          } : {}
        }>
          {
            status === BeerStatus.Fermentation
              ?
              "During fermentation, yeast converts sugars into alcohol and carbon dioxide, creating beer's flavor and alcohol content. You can preorder at this stage."
              : status === BeerStatus.Maturation
                ?
                "In maturation, beer ages to refine flavors and smooth out taste. You can preorder at this stage."
                : ''
          }
        </span>
      }
    </div>
  )
}
