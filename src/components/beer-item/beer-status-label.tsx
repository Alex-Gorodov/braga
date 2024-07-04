import { ReactComponent as InfoIcon } from "../../img/icons/info.svg";
import { BeerStatus, BeerStatusColor } from "../../const";
import { useState } from "react";

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
        {(status === BeerStatus.Fermentation || status === BeerStatus.Maturation) && <InfoIcon/>}
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
              "During fermentation, yeast converts sugars into alcohol, creating beer's flavor and alcohol content. You can preorder at this stage."
              : status === BeerStatus.Maturation
                ?
                "During the maturation process, the beer develops carbonation, aroma and smoothes out the taste. You can preorder at this stage."
                : ''
          }
        </span>
      }
    </div>
  )
}
