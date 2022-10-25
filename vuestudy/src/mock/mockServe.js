import Mock from 'mockjs'

import banner from './banner.json'
import floors from './floors.json'

Mock.mock("/mock/banner",{code:200,data:banner})//地址，数据
Mock.mock("/mock/floors",{code:200,data:floors})