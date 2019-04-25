export default class WxCanvas {
  constructor(ctx, canvasId) {
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    // this._initCanvas(zrender, ctx);
    this._initStyle(ctx);
    this._initEvent();
  }

  getContext(contextType) {
    if (contextType === "2d") {
      return this.ctx;
    }
  }

  // canvasToTempFilePath(opt) {
  //   if (!opt.canvasId) {
  //     opt.canvasId = this.canvasId;
  //   }

  //   return wx.canvasToTempFilePath(opt, this);
  // }

  setChart(chart) {
    this.chart = chart;
  }

  attachEvent() {
      // noop
  }

  detachEvent() {
      // noop
  }

  _initCanvas(zrender, ctx) {
    zrender.util.getContext = function () {
      return ctx;
    };
    // zrender.Image.prototype.brush = function (ctx, prevEl) {
    //   var style = this.style;
    //   var image = style.image;

    //   console.log(4);
      
    //   // Must bind each time
    //   style.bind(ctx, this, prevEl);

    //   var width = style.width;
    //   var height = style.height;
    //   var x = style.x || 0;
    //   var y = style.y || 0;

    //   // 设置transform
    //   this.setTransform(ctx);

    //   if (style.sWidth && style.sHeight) {
    //     var sx = style.sx || 0;
    //     var sy = style.sy || 0;
    //     ctx.drawImage(
    //       image,
    //       sx, sy, style.sWidth, style.sHeight,
    //       x, y, width, height
    //     );
    //   }
    //   else if (style.sx && style.sy) {
    //     var sx = style.sx;
    //     var sy = style.sy;
    //     var sWidth = width - sx;
    //     var sHeight = height - sy;
    //     ctx.drawImage(
    //       image,
    //       sx, sy, sWidth, sHeight,
    //       x, y, width, height
    //     );
    //   }
    //   else {
    //     ctx.drawImage(image, x, y, width, height);
    //   }

    //   // Draw rect text
    //   if (style.text != null) {
    //     // Only restore transform when needs draw text.
    //     this.restoreTransform(ctx);
    //     this.drawRectText(ctx, this.getBoundingRect());
    //   }
    // };
    // zrender.Image.prototype.getBoundingRect = function() {
    //   var style = this.style;
    //   if (!this._rect) {
    //     this._rect = new zrender.BoundingRect(style.x || 0, style.y || 0, style.width || 0, style.height || 0);
    //   }
    //   return this._rect;
    // };
    zrender.util.$override("measureText", function (text, font) {
      ctx.font = font || "12px sans-serif";
      return ctx.measureText(text);
    });
  }

  _initStyle(ctx) {
    var styles = [
      "fillStyle",
      "strokeStyle",
      "globalAlpha",
      "textAlign",
      "textBaseAlign",
      "shadow",
      "lineWidth",
      "lineCap",
      "lineJoin",
      "lineDash",
      "miterLimit",
      "fontSize",
      "image"
    ];

    styles.forEach(style => {
        Object.defineProperty(ctx, style, {
            set: value => {
                if (
                    (style !== "fillStyle" && style !== "strokeStyle") ||
                    (value !== "none" && value !== null)
                ) {
                    ctx[
                        "set" +
                            style.charAt(0).toUpperCase() +
                            style.slice(1)
                    ](value);
                }
            }
        });
    });

    ctx.createRadialGradient = () => {
        return ctx.createCircularGradient(arguments);
    };
  }

  _initEvent() {
    this.event = {};
    const eventNames = [
      {
        wxName: "touchStart",
        ecName: "mousedown"
      },
      {
        wxName: "touchMove",
        ecName: "mousemove"
      },
      {
        wxName: "touchEnd",
        ecName: "mouseup"
      },
      {
        wxName: "touchEnd",
        ecName: "click"
      }
    ];

    eventNames.forEach(name => {
      this.event[name.wxName] = e => {
        const touch = e.touches[0];
        this.chart._zr.handler.dispatch(name.ecName, {
          zrX: name.wxName === "tap" ? touch.clientX : touch.x,
          zrY: name.wxName === "tap" ? touch.clientY : touch.y
        });
      };
    });
  }
}
