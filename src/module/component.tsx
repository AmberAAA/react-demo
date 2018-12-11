import * as React from "react";

interface Props {
  a: string

}

interface Stats {
  a: string
}


class TabNav extends React.Component<Props, Stats> {

  public static defaultProps = {};

  constructor(props: Props, stats: Stats) {
    super(props, stats);
  }

}


// @ts-ignore
export default TabNav
