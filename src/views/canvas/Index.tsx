import * as React from "react";

interface Props {
  a: string

}

interface Stats {
  imgPath: string | undefined
}


class Game extends React.Component<Props, Stats> {

  public static defaultProps = {};

  public canvas: HTMLCanvasElement;

  constructor(props: Props, stats: Stats) {
    super(props, stats);
    this.state = {
      imgPath: undefined
    }
  }

  public handleInputChange = (e: React.FormEvent) => {
    // @ts-ignore
    const file = (e.target as HTMLInputElement).files[0];
    this.state.imgPath && window.URL.revokeObjectURL(this.state.imgPath)
    if (file) { this.setState({imgPath: window.URL.createObjectURL(file)}) }
  };

  public render () {
      return (
        <div>
          <input type="file" accept="image/*" onChange={this.handleInputChange}/>
          <canvas ref={(ca: HTMLCanvasElement) => this.canvas =  ca} />
        </div>
      )
  }

  public componentWillUnmount(): void {
    this.state.imgPath && window.URL.revokeObjectURL(this.state.imgPath)
  }

}


// @ts-ignore
export default Game
