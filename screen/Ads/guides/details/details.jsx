import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux';
import { Rating } from 'react-native-ratings';
import { Picker } from '@react-native-picker/picker'
import { default as Modal } from '../../../../components/Modal/modal'
import { default as EntypoIcon } from 'react-native-vector-icons/Entypo'

import DatePicker from '../../../../components/DatePicker/datepicker.component'
import Carousel from '../../../../components/Carousel/carousel'
import { styles } from './style'

class GuideDetails extends React.Component {
    state = {
        isOpenForm: false,
        isOpenDatePickerStartDate: false,
        isOpenDatePickerEndDate: false,
        formPage: 1,
        startDate: null,
        startDateTimestamp: null,
        endDate: null,
    }

    handleOpenFormModal = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm,
            formPage: 1,
            startDate: null,
            endDate: null
        })
    }

    handleConfirmFormAction = () => {
        this.setState({ formPage: this.state.formPage + 1 })
    }

    handleOpenDatePicker = (type) => {
        if (type === 'startDate') {
            this.setState({ isOpenDatePickerStartDate: !this.state.isOpenDatePickerStartDate })
        } else {
            this.setState({ isOpenDatePickerEndDate: !this.state.isOpenDatePickerEndDate })
        }

    }

    formatDate = (number) => {
        return number >= 10 ? number : "0" + number
    }

    handleDateInput = async (date, name) => {
        let selectedDate = new Date(date.nativeEvent.timestamp)
        let setMinimumDate = name === "startDate" && parseInt(date.nativeEvent.timestamp) + (60 * 60 * 24 * 1000)
        selectedDate = this.formatDate(selectedDate.getDate()) + " / " + this.formatDate((parseInt(selectedDate.getMonth())) + 1) + " / " + selectedDate.getFullYear()

        return date.nativeEvent.timestamp && this.setState({
            [name]: selectedDate,
            startDateTimestamp: setMinimumDate,
            isOpenDatePickerStartDate: false,
            isOpenDatePickerEndDate: false
        })
    }

    requestFormComponent = () => {
        const components = [
            (
                <View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Country</Text>
                        <Picker
                            selectedValue={"js"}
                            style={styles.formPicker}
                            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>State</Text>
                        <Picker
                            selectedValue={"js"}
                            style={styles.formPicker}
                            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>City</Text>
                        <Picker
                            selectedValue={"js"}
                            style={styles.formPicker}
                            onValueChange={(itemValue, itemIndex) => console.log(itemValue)}>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                        </Picker>
                    </View>
                </View>
            ),
            (
                <View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Start Date</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.dateInputBox}
                            onPress={() => this.handleOpenDatePicker('startDate')}
                        >
                            <Text style={styles.dateInput}>{
                                this.state.startDate ? this.state.startDate : "DD/ MM / YYYY"
                            } </Text>
                        </TouchableOpacity>
                        <DatePicker
                            testID="dateTimePicker"
                            show={this.state.isOpenDatePickerStartDate}
                            value={Date.now()}
                            display="default"
                            placeholder="Start Date"
                            handler={(date) => this.handleDateInput(date, 'startDate')}
                        />
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>End Date</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.dateInputBox}
                            onPress={() => this.handleOpenDatePicker('endDate')}
                        >
                            <Text style={styles.dateInput}>{
                                this.state.endDate ? this.state.endDate : "DD/ MM / YYYY"
                            } </Text>
                        </TouchableOpacity>
                        <DatePicker
                            testID="dateTimePicker"
                            show={this.state.isOpenDatePickerEndDate}
                            value={Date.now()}
                            display="default"
                            placeholder="End Date"
                            minDate={this.state.startDateTimestamp && this.state.startDateTimestamp}
                            handler={(date) => this.handleDateInput(date, 'endDate')}
                        />
                    </View>
                </View>
            ),
            (
                <View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Offers</Text>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="number-pad"
                            placeholder="Amount"
                        />
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Offers</Text>
                        <TextInput
                            style={{ ...styles.textInput, textAlignVertical: 'top' }}
                            underlineColorAndroid="transparent"
                            placeholder="Type something here..."
                            multiline={true}
                            numberOfLines={4}
                            maxLength={500}
                        />
                    </View>
                </View>
            )

        ]

        return components[this.state.formPage - 1]
    }

    render() {
        const data = [
            "images\\04dbe864-ffda-4746-a86c-8050a042f739.png",
            "images\\73759f10-c10a-4949-8cba-466d75b63e8b.png",
        ]

        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.isOpenForm && <Modal
                        modalHeader={"Request Form"}
                        formComponent={this.requestFormComponent}
                        buttonLabel={"Next"}
                        onClose={this.handleOpenFormModal}
                        onConfirm={this.handleConfirmFormAction}
                    />
                }

                <View style={styles.viewArea}>
                    <ScrollView style={styles.container}>
                        <Carousel
                            imageArr={data}
                            options={{ height: 320 }}
                        />
                        <View style={styles.headerBox}>
                            <Text style={styles.headerName}>AAAAABBBXXXX</Text>
                            <Text style={styles.headerPrice}>$90</Text>
                            <View style={styles.headerRating}>
                                <Rating
                                    type='custom'
                                    ratingCount={5}
                                    imageSize={16}
                                    startingValue={4}
                                    readonly={true}
                                    style={styles.rating}
                                />
                                <Text style={styles.ratingLabel}>10 Trip</Text>
                            </View>
                        </View>
                        <View style={styles.profileBox}>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileTitle}>Gender</Text>
                                <Text style={styles.profileSeparator}>:</Text>
                                <Text style={styles.profileData}>Male</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileTitle}>Age</Text>
                                <Text style={styles.profileSeparator}>:</Text>
                                <Text style={styles.profileData}>20</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileTitle}>Email</Text>
                                <Text style={styles.profileSeparator}>:</Text>
                                <Text style={styles.profileData}>alexkeman9@gmail.com</Text>
                            </View>
                            <View style={styles.profileItem}>
                                <Text style={styles.profileTitle}>Status</Text>
                                <Text style={styles.profileSeparator}>:</Text>
                                <View style={styles.statusBox}>
                                    <View style={styles.statusFlag}></View>
                                    <Text style={styles.statusText}>On</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.descriptionBox}>
                            <Text>Componentsss</Text>
                        </View>
                    </ScrollView>
                </View>
                {
                    !this.state.isOpenForm && <View style={styles.actionBox}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.actionSubmit} onPress={this.handleOpenFormModal}>
                            <Text style={styles.submitText}>Request a Trip!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={styles.actionIcon}>
                            <EntypoIcon name="chat" color="orange" size={20} />
                        </TouchableOpacity>
                    </View>
                }

            </SafeAreaView>
        )
    }
}


const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    // get_tours_agency_detail: (data) => dispatch(get_tours_agency_detail(data)),
    // post_user_booking: (data) => dispatch(post_user_booking(data)),
    // chats_send_message: (data) => dispatch(chats_send_message(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuideDetails);
