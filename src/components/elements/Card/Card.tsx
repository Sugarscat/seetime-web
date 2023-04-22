import React from "react";
import "./Card.css"

export interface CardProps {
    width: number
    title: any
    children: any;
}

export const Card = (props: CardProps) => {
  return (
      <>
          <div className={"sugar-card"} style={{width: props.width}}>
              <div className={"sugar-card-header"}>
                  {props.title}
              </div>
              {props.children ? <div className={"sugar-card-body"}>{props.children}</div> : null}
          </div>
      </>
  )
}

Card.defaultProps = {
    width: 200
}
