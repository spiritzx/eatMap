import * as zrender from '../lib/zrender-min';
import * as zrhelper from '../lib/zrender-help';
function endAngel(per) {
  return 2 * Math.PI * per;
}

class creatImg {
  constructor() {}
  init(params) {
    return zrhelper.createZrender(params.ele, params.w, params.h);
  }
  // 图片
  img(params) {
    return new Promise((resolve, reject) => {
      let res = {};
      if (params.down) {
        wx.downloadFile({
          url: params.url,
          success: function(res) {
            if (res.statusCode === 200) {
              params.url = res.tempFilePath;
              res = new zrender.Image({
                style: {
                  x: params.x,
                  y: params.y,
                  image: params.url,
                  width: params.w,
                  height: params.h
                }
              });
              resolve(res);
            }
          }
        });
      } else {
        res = new zrender.Image({
          style: {
            x: params.x,
            y: params.y,
            image: params.url,
            width: params.w,
            height: params.h
          }
        });
        resolve(res);
      }
    });
  }
  // 长方形
  rect(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Rect({
        style: {
          fill: params.bg
        },
        shape: {
          x: params.x,
          y: params.y,
          r: params.r,
          width: params.w,
          height: params.h
        }
      });
      resolve(res);
    });
  }
  // 圆形
  circle(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Circle({
        style: {
          fill: params.bg
        },
        shape: {
          cx: params.cx,
          cy: params.cy,
          r: params.cr
        }
      });
      resolve(res);
    });
  }
  // 圆形头像
  avata(params) {
    let _circle = new zrender.Circle({
      shape: {
        cx: params.cx,
        cy: params.cy,
        r: params.cr
      }
    });
    return new Promise((resolve, reject) => {
      let res = {};
      if (params.down) {
        wx.downloadFile({
          url: params.url,
          success: function (res) {
            if (res.statusCode === 200) {
              params.url = res.tempFilePath;
              res = new zrender.Image({
                style: {
                  x: params.x,
                  y: params.y,
                  image: params.url,
                  width: params.w,
                  height: params.h
                }
              });
              res.setClipPath(_circle);
              resolve(res);
            }
          }
        });
      } else {
        res = new zrender.Image({
          style: {
            x: params.x,
            y: params.y,
            image: params.url,
            width: params.w,
            height: params.h
          }
        });
        res.setClipPath(_circle);
        resolve(res);
      }
    });
  }
  // 字
  txt(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Text({
        style: {
          x: params.x,
          y: params.y,
          text: params.txt,
          fontSize: params.fs,
          textFill: params.tc,
          textAlign: params.align ? params.align : null,
          textPadding: params.padding ? params.padding : 0,
          fontWeight: params.weight ? params.weight : null
        }
      });
      resolve(res);
    });
  }
  // 划线
  line(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Line({
        style: {
          lineWidth: params.w
        },
        shape: {
          x1: params.x1,
          y1: params.y1,
          x2: params.x2,
          y2: params.y2
        }
      });
      resolve(res);
    });
  }
  // 线性渐变
  linearBg(params) {
    return new Promise((resolve, reject) => {
      let linear = new zrender.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: params.startBg
        },
        {
          offset: 1,
          color: params.endBg
        }
      ]);

      let res = new zrender.Rect({
        style: {
          fill: linear
        },
        shape: {
          x: params.x,
          y: params.y,
          r: params.r,
          width: params.w,
          height: params.h
        }
      });
      resolve(res);
    });
  }
  // 正边形
  polygonFn(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Polygon({
        style: {
          fill: params.color
        },
        shape: {
          points: params.pOptions,
          smooth: params.radius,
          smoothConstraint: params.sOptions
        }
      });
      resolve(res);
    });
  }
  // 画圆弧
  sector(params) {
    return new Promise((resolve, reject) => {
      let res = new zrender.Sector({
        style: {
          fill: params.color
        },
        shape: {
          cx: params.cx,
          cy: params.cy,
          r: params.r,
          r0: params.r0,
          startAngle: endAngel(params.start),
          endAngle:
            Math.round(endAngel(params.end) * 100) / 100 +
            endAngel(params.start),
          clockwise: params.clockwise ? params.clockwise : true
        }
      });
      resolve(res);
    });
  }
} 

export default new creatImg();