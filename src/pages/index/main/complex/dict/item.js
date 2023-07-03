import select from "@index/main/select"
import Dictionary from "./build/Dictionary"
import api from "@/config/api"


function mutipleFileUpload(fileList) {
  return new Promise((resolve) => {
    let resList = []
    function next(fileList, index) {
      if (index < fileList.length) {
        fileUpload(fileList[index]).then(res => {
          resList.push(res)
          next(fileList, index + 1)
        }, err => {
          next(fileList, index + 1)
        })
      } else {
        resolve(resList)
      }
    }
    next(fileList, 0)
  })
}
function fileUpload(file) {
  return new Promise((resolve, reject) => {
    api.itemImgUpload({
      status: 'pictureUpload',
      file: file
    }).then(res => {
      resolve({
        data: res.data.data.path,
        url: res.data.data.path,
        name: file.name
      })
    }, err => {
      reject(err)
    })
  })
}

// {
//   "commodity_id": "4",
//   "": "0",
//   "commodity_name": "测试套餐2",
//   "sku_id": "92001003",
//   "model_id": "",
//   "original_price": "10000",
//   "selling_price": "990",
//   "sold_quantity": "1234",
//   "evaluate": "99",
//   "order_by": "1",
//   "sale_status": "1",
//   "commodity_marketing_id": "1",
//   "commodity_resourceniche_id": "1",
//   "create_time": "1687952331",
//   "main_pic": [
//       "https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01zEp6s42GMyEooO4qb_!!2215920109002-0-wsb.jpg"
//   ],
//   "detail_pic": [
//       "https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01vDABbw2GMyEtd1UWF_!!2215920109002-0-wsb.jpg"
//   ],
//   "commodity_marketing": "销售语"
// },

export const itemDict = new Dictionary({
  list: [
    {
      prop: 'id',
      name: 'ID',
      originprop: 'commodity_id',
      originfrom: 'list',
      mod: {}
    },
    {
      prop: 'commodity_zone_id',
      name: 'commodity_zone_id',
      originprop: 'commodity_zone_id',
      originfrom: 'list',
      mod: {}
    },
    {
      prop: 'sku_id',
      name: 'sku_id',
      originprop: 'sku_id',
      originfrom: 'list',
      mod: {}
    },
    {
      prop: 'model_id',
      name: 'model_id',
      originprop: 'model_id',
      originfrom: 'list',
      mod: {}
    },
    {
      prop: 'name',
      name: '名称',
      originprop: 'commodity_name',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'input',
          required: true,
          option: {
            maxLength: 100
          }
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    {
      prop: 'original_price',
      name: '原价',
      originprop: 'original_price',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'inputNumber',
          required: true,
          option: {}
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    {
      prop: 'selling_price',
      name: '售价',
      originprop: 'selling_price',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'inputNumber',
          required: true,
          option: {}
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    {
      prop: 'commodity_marketing',
      name: '销售语',
      originprop: 'commodity_marketing',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'input',
          required: true,
          option: {
            maxLength: 10
          }
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    select.getItemByFormat('base', 'status', {
      prop: 'status',
      name: '状态',
      originprop: 'sale_status',
      originfrom: 'list'
    }, {
      list: {
        color: true
      },
      edit: {
        change: true,
        build: true
      }
    }),
    {
      prop: 'main_pic',
      name: 'LOGO',
      originprop: 'main_pic',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'file',
          placeholder: '请上传照片',
          required: true,
          option: {
            accept: '.jpg,.jpeg,.png',
            multiple: true,
            maxNum: 10,
            maxSize: 10,
            upload: true,
            fileUpload({ file }) {
              return mutipleFileUpload(file)
            }
          }
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    {
      prop: 'detail_pic',
      name: '详情',
      originprop: 'detail_pic',
      originfrom: 'list',
      mod: {
        list: {},
        edit: {
          type: 'file',
          placeholder: '请上传照片',
          required: true,
          option: {
            accept: '.jpg,.jpeg,.png',
            multiple: true,
            maxNum: 10,
            maxSize: 10,
            upload: true,
            fileUpload({ file }) {
              return mutipleFileUpload(file)
            }
          }
        },
        build: {
          type: 'edit'
        },
        change: {
          type: 'edit'
        }
      }
    },
    {
      prop: 'menu',
      name: '操作',
      originprop: 'menu',
      originfrom: 'local',
      mod: {
        list: {}
      }
    }
  ]
})
