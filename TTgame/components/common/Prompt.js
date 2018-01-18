import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';

import { totalWidth, totalHeight, dpr } from '../../conf/deviceParam';

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickDetermine = this.onClickDetermine.bind(this);
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.props.visible}
          animationType={'fade'}
          transparent={true} >
          <View style={styles.container}>
            <View style={styles.promptWrap}>
              <View style={styles.titleWrap}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.title}</Text>
                <Text style={{ marginTop: 2 }}>{this.props.content}</Text>
              </View>
              <View style={styles.bottomBtnWrap}>
                {
                  this.props.isAskModal &&
                  <View style={[styles.bottomBtn, { borderRightWidth: 1 / dpr, borderStyle: 'solid', borderColor: '#E8E8E8' }]}>
                    <Text style={styles.btnText} onPress={this.onClickCancel}>取消</Text>
                  </View>
                }
                <View style={styles.bottomBtn}>
                  <Text style={styles.btnText} onPress={this.onClickDetermine}>确定</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  onClickCancel() {
    (this.props.onClickCancel && this.props.onClickCancel());
  }

  onClickDetermine() {
    (this.props.onClickDetermine && this.props.onClickDetermine());
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  promptWrap: {
    backgroundColor: '#FFF',
    width: totalWidth * 0.75,
    borderRadius: 10,
    overflow: 'hidden', 
  },
  titleWrap: {
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#E8E8E8',
    borderBottomWidth: 1 / dpr,
  },
  bottomBtnWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  btnText: {
    fontSize: 16,
    color: '#4ba7ee',
  },
});
