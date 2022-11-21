// 信息类型
export const INFO_TYPE = {
  ALL: -1,
  ENV: 0,
  DEVICE: 1,
  FIRE: 2,
  SAFE: 3,
  VALUES: [-1, 0, 1, 2, 3],
  toString: (v: number | string) => {
    switch (+v) {
      case INFO_TYPE.ALL:
        return '全部类型';
      case INFO_TYPE.ENV:
        return '环境卫生';
      case INFO_TYPE.DEVICE:
        return '设备信息';
      case INFO_TYPE.FIRE:
        return '消防隐患';
      case INFO_TYPE.SAFE:
        return '安全隐患';
      default:
        return '';
    }
  },
};

// 任务状态
export const TASK_STATUS = {
  WAIT: 0,
  NOT: 2,
  HANDLED: 1,
  VALUES: [0, 1, 2],
  toString: (v: number) => {
    switch (v) {
      case TASK_STATUS.WAIT:
        return '待处理';
      case TASK_STATUS.NOT:
        return '不予处理';
      case TASK_STATUS.HANDLED:
        return '已处理';
      default:
        return '';
    }
  },
  toKey: (v: number) => {
    switch (v) {
      case TASK_STATUS.WAIT:
        return 'wait';
      case TASK_STATUS.NOT:
        return 'not';
      case TASK_STATUS.HANDLED:
        return 'handled';
      default:
        return '';
    }
  },
};
