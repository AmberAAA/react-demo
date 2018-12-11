import * as React from "react";

interface Props {
  classPrefix: string,
  panels: React.Component[],
  activeIndex: number
}

interface Stats {
  a: string
}

class TabNav extends React.Component<Props, Stats> {

  constructor(props: Props, stats: Stats) {
    super(props, stats);
  }

  public getTabs = () => {
    const {panels, classPrefix, activeIndex} = this.props;
    // const order = parseInt(child)
    //
    // let classes = [`${classPrefix}-tab`]
    // if (activeIndex === )

    return React.Children.map(panels, child => {
      if (!child) {
        return;
      }

      // @ts-ignore
      const order = parseInt(child.props.order, 10)

      const classname = [`${classPrefix}-tab`]

      if (activeIndex === order) {
        classname.push(`${classPrefix}-active`)
      }

      if (child.props.disabled) {
        classname.push(`${classPrefix}-disable`)
      }

      // let events = {};

      // @ts-ignore
      if (!child.props.disabled) {
        events = {
          onClick = this.
        }
      }

    })
  }
}


// @ts-ignore
export default TabNav
