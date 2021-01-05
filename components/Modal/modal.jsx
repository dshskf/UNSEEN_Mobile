import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { color } from '../../constant/style';
import { styles } from './style'

class Modal extends React.Component {
    render() {
        return (
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <View style={styles.modalTitle}>
                        <Text style={styles.titleText}>{this.props.modalHeader}</Text>
                        <TouchableOpacity activeOpacity={0.8} style={styles.titleActionBox} onPress={this.props.onClose}>
                            <Text style={styles.titleAction}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formArea}>
                        {this.props.formComponent()}
                    </View>
                    <View style={styles.formButtonBox}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                ...styles.formButton,
                                backgroundColor: this.props.disabled ? color.primary_hover : color.primary,
                            }}
                            disabled={this.props.disabled}
                            onPress={this.props.onConfirm}
                        >
                            <Text style={styles.formButtonText}>{this.props.buttonLabel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}


export default Modal;
