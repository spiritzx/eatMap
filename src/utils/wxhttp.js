import wepy from 'wepy';

const wxhttp = (option={}) => {
  let data = option|| {};
  let gbl = wepy.$instance.globalData;
  return new Promise((resolve, reject) => {
    wepy.request({
      url: option.url ? option.url : gbl.baseUrl,
      method: option.method || 'POST',
      data: data,
      dataType: 'json',
      header: { 
        'Content-Type': option.type || 'application/json',
        'cookie': gbl.session
      },
      success: function (res, header) {
        resolve(res)
      },
      fail: function (err) {
        console.log('错误');
        
        console.log(err);
        
        reject(err)
      }
    });
  }) 
};

export default wxhttp;