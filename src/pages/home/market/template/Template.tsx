import "./Template.css"

export interface TemplateProps {
    title: any
    operate: any
    children: any
}

const Template = (props: TemplateProps) => {
  return(
      <div className={"sugar-template"}>
          <div className={"template-sticky"}>
              <div className={"template-title"}><h2>{props.title}</h2></div>
              <div className={"template-operate"}>{props.operate}</div>
          </div>
          <div className={"template-content"}>
              {props.children}
          </div>
      </div>
  )
}

Template.defaultProps = {
    title: "",
    operate: "",
    children: "",
}

export default Template
