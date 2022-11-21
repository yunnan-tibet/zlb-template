import { Component, ReactNode } from "react";
import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { s_to_hs } from "@/utils/utils";
import { API_PREFIX_IMAGE } from '@/constants/common';

import "./index.less";

const recall = `${API_PREFIX_IMAGE}/recall.png`;
const audioLoading = `${API_PREFIX_IMAGE}/audioLoading.png`;
const warning = `${API_PREFIX_IMAGE}/warning.png`;

export interface PropsType {
  children: ReactNode;
  onSuccess?: Function;
  onStart?: Function;
}
interface StateType {
  time: number;
  modalCancel: boolean;
  modalShow: boolean;
  sq: boolean;
  switchFlag: boolean;
  modalShortTime: boolean;
}
class SoundRecord extends Component<PropsType, StateType> {
  recorderManager: Taro.RecorderManager;
  startY: number;
  moveY: number;
  timeoutTimer: any;
  timer: NodeJS.Timer;
  constructor(props) {
    super(props);
    this.recorderManager = Taro.getRecorderManager();
    this.startY = 0;
    this.moveY = 0;
    this.state = {
      time: 0,
      modalCancel: false,
      modalShow: false,
      sq: false,
      switchFlag: false,
      modalShortTime: false
    };
  }
  handleTouchStart = e => {
    const that = this;
    this.timeoutTimer && clearTimeout(this.timeoutTimer);
    this.timeoutTimer = setTimeout(() => {
      that.setState(
        {
          switchFlag: false
        },
        () => {
          Taro.getSetting({
            success: function(res) {
              if (res.authSetting["scope.record"] === undefined) {
                Taro.authorize({
                  scope: "scope.record",
                  success: function() {
                    that.setState({
                      sq: true
                    });
                  }
                });
              } else if (res.authSetting["scope.record"] === false) {
                Taro.showModal({
                  title: "授权请求",
                  content: `尚未允许使用，请点击确认进行授权`,
                  success(e) {
                    if (e.confirm) {
                      Taro.openSetting({
                        success(e) {
                          if (e.authSetting["scope.record"]) {
                            that.setState({
                              sq: true
                            });
                          }
                        }
                      });
                    }
                  }
                });
              } else {
                that.setState(
                  {
                    sq: true
                  },
                  () => {
                    that.handleLong(e);
                  }
                );
              }
            },
            fail: () => {
              console.log("失败");
            }
          });
        }
      );
    }, 100);
  };
  handleTouchMove = e => {
    const { time } = this.state;
    e.stopPropagation();
    if (e.touches.length === 1 && time >= 1) {
      const { modalCancel } = this.state;
      const moveY = e.touches[0].clientY;
      if (this.startY - moveY > 80 && !modalCancel) {
        this.handlePause();
      } else if (this.startY - moveY < 80) {
        if (modalCancel) {
          this.handleResume();
        }
      }
    }
  };
  handleTouchEnd = async () => {
    const { switchFlag, modalCancel, modalShow } = this.state;
    this.timeoutTimer && clearTimeout(this.timeoutTimer);
    this.timer && clearTimeout(this.timer);
    if (!switchFlag && (modalCancel || modalShow)) {
      this.recorderManager.stop();
      return;
    }

    this.setState(
      {
        modalShortTime: true,
        switchFlag: true
      },
      () => {
        const shotTime = setTimeout(() => {
          clearTimeout(shotTime);
          this.setState({
            modalShortTime: false
          });
        }, 1000);
      }
    );
  };

  // 暂停录音
  handlePause = () => {
    this.recorderManager.pause();
    this.setState({
      modalCancel: true,
      modalShow: false
    });
    clearInterval(this.timer);
  };

  // 继续录音
  handleResume = () => {
    this.recorderManager.resume();
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time + 1
      });
    }, 1000);
    this.setState({
      modalCancel: false,
      modalShow: true
    });
  };

  handleLong = e => {
    const that = this;
    const { onSuccess } = that.props;
    if (that.state.sq && !that.state.switchFlag) {
      that.setState({
        modalShow: true
      });
      if (e.touches.length === 1) {
        that.recorderManager.start({
          duration: 60000,
          sampleRate: 22050,
          numberOfChannels: 2,
          encodeBitRate: 32000,
          format: "mp3"
        });

        that.recorderManager.onStop(res => {
          that.timer && clearInterval(that.timer);
          const { modalCancel, time } = this.state;
          if (time >= 1) {
            if (!modalCancel) {
              onSuccess && onSuccess({ ...res, time });
            }
          } else {
            this.setState(
              {
                modalShortTime: true
              },
              () => {
                const shotTime = setTimeout(() => {
                  clearTimeout(shotTime);
                  this.setState({
                    modalShortTime: false
                  });
                }, 1000);
              }
            );
            onSuccess &&
              onSuccess({
                fileSize: 0,
                tempFilePath: ""
              });
          }
          this.setState({
            modalShow: false,
            time: 0,
            modalCancel: false,
            sq: false
          });
        });
        that.startY = e.touches[0].clientY;
        const interval = () => {
          that.timer = setTimeout(() => {
            that.setState(
              {
                time: that.state.time + 1
              },
              () => {
                interval();
              }
            );
          }, 1000);
        };
        interval();
      }
    }
  };
  render() {
    const { children } = this.props;
    const { time, modalCancel, modalShow, modalShortTime } = this.state;
    return (
      <View className="sound" catchMove>
        {modalCancel ? (
          <View className="cancel-vadio-loading">
            <Image className="cancel-loading-icon" src={recall}></Image>
            <Text className="sound-loading-wain">松开手指，取消发送</Text>
          </View>
        ) : null}
        {modalShow ? (
          <View className="sound-loading">
            <Text className="sound-loading-time">{s_to_hs(time)}</Text>
            <Image className="sound-loading-icon" src={audioLoading}></Image>
            <Text className="sound-loading-wain">松手发送，上滑取消</Text>
          </View>
        ) : null}
        {modalShortTime ? (
          <View className="sound-warning">
            <Image
              mode="aspectFit"
              className="sound-warning-icon"
              src={warning}
            ></Image>
            <Text className="sound-warning-wain">说话时间太短</Text>
          </View>
        ) : null}
        <View
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {children}
        </View>
      </View>
    );
  }
}
export default SoundRecord;
