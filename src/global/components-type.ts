export interface IFormItems {
  type: string // 表单类型
  label?: string // 表单左侧文本
  prop: string // 表单绑定的变量
  placeholder?: string // 表单提示文本
  initalValue?: string //  表单默认值
  options?: any[] // select表单的子选项
  slotName?: string // 自定义插槽名称
}
