import * as React from "react";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import './index.css';

interface Props {
  a: string

}

interface Stats {
  imgPath: string | undefined,
  imgArray: CutImage[],
  answerImaArray: CutImage[],
  config: Config,
  activeIndex: string
}

interface Config {
  row: number,
  col: number
}

interface CutImage {
  c: number,
  r: number,
  data: string
}

const INFO = {
  CANVAS_WIDTH: 640,
  CANCAS_HEIGHT: 450
};

let answer: CutImage[];

class Game extends React.Component<Props, Stats> {

  public static defaultProps = {};

  public canvas: HTMLCanvasElement;
  private img: HTMLImageElement;

  constructor(props: Props, stats: Stats) {
    super(props, stats);
    this.state = {
      imgPath: undefined,
      imgArray: [],
      answerImaArray: [],
      activeIndex: '',
      config: {
        row: 10,
        col: 10
      }
    }
  }

  public static cutImg(img: HTMLImageElement, config: Config) {
    if (img.width / img.height < 0.666 && img.width / img.height > 1.5) {
      // TODO: 不好
    }
    const imgs: CutImage[] = [];
    const canvas = document.createElement('canvas');
    canvas.height = img.height / config.row;
    canvas.width = img.width / config.col;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      for (let r = 0; r < config.row; r++) {
        for (let c = 0; c < config.col; c++) {
          ctx.drawImage(img, -c * canvas.width, -r * canvas.height);
          // console.log(c,r)
          imgs.push({
            c,
            r,
            data: canvas.toDataURL()
          })
        }
      }
    }
    return imgs
  }

  public handleInputChange = (e: React.FormEvent) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (ee: ProgressEvent) => {
        this.img = new Image()
        this.img.onload = () => {
          debugger
          const back = Game.cutImg(this.img, this.state.config)
          // @ts-ignore
          answer = [].concat(back);
          // @ts-ignore
          const imgArray: CutImage[] = [].concat(back.sort(() => Math.random() > 0.5 ? 1 : -1))
          const answerImaArray = imgArray.map(item => {
            return Object.assign([], item, {data: 'https://place-hold.it/1x1/eee?text='})
          })
          this.setState({imgArray, answerImaArray})
        }
        // @ts-ignore
        const imgPath = ee.target.result;
        this.img.src = imgPath;
        this.setState({imgPath})
      };
      reader.readAsDataURL(file)
    }
  };

  public dragStartHandle = (e: React.DragEvent, payload: number) => {
    e.dataTransfer.setData('beck2map', payload.toString())
  };

  public render () {
    return (
      <div id={"game"}>
        <Row type={"flex"} justify={"center"}>
          <Col span={20}>
            <input type="file" accept="image/*" onChange={this.handleInputChange}/>
          </Col>
        </Row>
        <Row type={"flex"} justify={"center"}>
          <Col span={20}>
            {/*<canvas ref={(ca: HTMLCanvasElement) => this.canvas = ca}*/}
            {/*width={600}*/}
            {/*height={450}*/}
            {/*onDragEnter={e => {console.log(e)}}*/}
            {/*/>*/}
            <div style={{width: INFO.CANVAS_WIDTH}}
                 className={'game-map'}
                 onDragOver={this.onDragOverHandle}
            >
              {this.renderGameMap()}
            </div>
          </Col>
        </Row>
        <Row type={"flex"} justify={"center"}>
          {this.state.imgArray.map((e, index) =>
            <Col key={index}
                 order={index}
                 onDragOver={this.onDragOverHandle}
            >
              <img src={e.data}
                   draggable={true}
                   alt=""
                   className={'img-block'}
                   onDragStart={$e => this.dragStartHandle($e, index)}
                   onDrop={$e => this.onDropDeckHand($e, index)}
              />
            </Col>
          )}
        </Row>
      </div>
    );
  }

  public componentWillUnmount(): void {
    this.state.imgPath && window.URL.revokeObjectURL(this.state.imgPath)
  }

  public onDragOverHandle = (e: React.DragEvent) => {
    e.preventDefault();
  }

  public onDropHand = (e: React.DragEvent, payload: number) => {
    // this.state.answerImaArray[payload] = JSON.parse(e.dataTransfer.getData('Text'))
    if (e.dataTransfer.getData('beck2map')) {
      const from = Number(e.dataTransfer.getData('beck2map'));
      const imgArr = this.state.imgArray.splice(from, 1);
      if (/^http/.test(this.state.answerImaArray[payload].data)) {
        // 是占位符，直接替换
        this.state.answerImaArray[payload].data = imgArr[0].data;
      } else {
        // 不是占位符，做交换
        this.state.imgArray.push(Object.assign({}, this.state.answerImaArray[payload]))
        this.state.answerImaArray[payload].data = imgArr[0].data;
      }
      e.dataTransfer.clearData('beck2map')
    }
    if (e.dataTransfer.getData('map2map')) {
      const from = this.state.answerImaArray[Number(e.dataTransfer.getData('map2map'))];
      const to = this.state.answerImaArray[payload];
      const {data} = to;
      to.data = from.data;
      from.data = data;
      e.dataTransfer.clearData('map2map')
      e.dataTransfer.clearData('map2beck')
    }
    this.setState({activeIndex: ''});
    setTimeout(() => {
      this.checkAnswer();
    })
  };

  public onDropDeckHand = (e: React.DragEvent, payload: number) => {
    if (e.dataTransfer.getData('map2beck')) {
      const from = this.state.answerImaArray[Number(e.dataTransfer.getData('map2beck'))];
      this.state.imgArray.push(Object.assign({}, from));
      from.data = 'https://place-hold.it/1x1/eee?text=';
      e.dataTransfer.clearData('map2beck');
      e.dataTransfer.clearData('map2map');
    }
    this.setState({activeIndex: ''});
  }

  public dragStartFromMapHandle = (e: React.DragEvent, i: number, payload: CutImage) => {
    if (/^http/.test(payload.data)) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.dataTransfer.setData('map2map', i.toString())
    e.dataTransfer.setData('map2beck', i.toString())
  };

  public checkAnswer = () => {
    if (answer) {
      for (let i = 0; i < answer.length; i++) {
        if (/^http/.test(this.state.answerImaArray[i].data)) {
          return;
        }
        if (answer[i].data !== this.state.answerImaArray[i].data) {
          return;
        }
      }
      alert('NICE!');
    }
  };


  private renderGameMap = () => {
    return this.state.answerImaArray.map((e, i) => {
        const index = `${e.c}-${e.r}`;
        return (
          <img src={e.data}
               alt=""
               className={`game-card-img${this.state.activeIndex === index ? ' active' : ''}`}
               key={index}
               style={{
                 width: INFO.CANVAS_WIDTH / this.state.config.col,
                 height: INFO.CANCAS_HEIGHT / this.state.config.row
               }}
               draggable={true}
               onDragEnter={() => this.setState({activeIndex: index})}
               onDragExit={() => this.setState({activeIndex: ''})}
               onDragOver={this.onDragOverHandle}
               onDrop={$e => this.onDropHand($e, i)}
               onDragStart={$e => this.dragStartFromMapHandle($e, i, e)}
          />
        )
      }
    )
  }
}


// @ts-ignore
export default Game
