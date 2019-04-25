const getAd = that => {
  return new Promise((resolve, reject) => {
    let _data = { Business: 'getAdConfig', gno: 'gh_dfd3f012e270', appGno: 'gh_fb3a3646de20' };
    let obj = {
      mode: null,
      isShare: null,
      ad1: null,
      ad2: null,
      ad3: null,
      ad4: null,
      ad5: null,
      ad6: null,
      ad7: null,
      ad8: null,
      ad9: null,
      ad10: null,
      ad11: null,
      ad12: null,
      ad13: null,
      ad14: null,
      ad15: null,
      ad16: null,
      ad17: null,
      ad18: null,
      ad19: null,
      ad20: null
    };
    wx.request({
      //http://192.168.0.180:1128/xcxGroupHandler
      //https://common.5x5x5.cn/xcxGroupHandler
      url: 'https://common.5x5x5.cn/xcxGroupHandler',
      data: _data,
      method: 'POST',
      dataType: 'json',
      success: res => {
        let _data = res.data;
        if (_data.code === '200') {
          _data.data.forEach((val, i) => {
            let res = val.position in obj;
            if (res) {
              obj[val.position] = val;
            }
            if (val.status) {
              obj.mode = 1;
            }
            if (val.isShare) {
              obj.isShare = 1;
            }
          });
          
        }
        if (that.$parent) that.$parent.globalData.adConfig = obj;
        resolve(obj);
      } });
  })
}
export default getAd;