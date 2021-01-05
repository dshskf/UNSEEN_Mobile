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
import { get_tours_guides_detail, post_user_request } from '../../../../redux/tours/tours.action'
import { get_location_data, chats_send_message } from '../../../../redux/features/features.action'
import { styles } from './style'
import Spinner from '../../../../components/Spinner/spinner';
import { color } from '../../../../constant/style';
import { userStorage } from '../../../../constant/request';
import moment from 'moment'

class GuideDetails extends React.Component {
    state = {
        isOpenForm: false,
        isOpenDatePickerStartDate: false,
        isOpenDatePickerEndDate: false,
        isDisableModalButton: true,
        formPage: 1,
        startDate: null,
        startDateTimestamp: null,
        endDate: null,
        guidesData: null,
        country_data: null,
        state_data: null,
        city_data: null,
        selected_country: null,
        selected_state: null,
        selected_city: null,
        offers: '',
        description: ''
    }

    async componentDidMount() {
        const { guidesId } = this.props.route.params
        const guidesData = await this.props.get_tours_guides_detail({ id: guidesId })
        const countriesData = await this.props.get_location_data({ action: "countries" })

        this.setState({
            guidesData: guidesData.guides,
            country_data: countriesData.data
        })
    }

    handleOpenFormModal = () => {
        this.setState({
            isOpenForm: !this.state.isOpenForm,
            formPage: 1,
            isDisableModalButton: true,
            startDate: null,
            endDate: null,
            selected_country: null,
            selected_state: null,
            selected_city: null,
            offers: '',
            description: ''
        })
    }

    handleDestinationInput = async (itemValue, itemRow, method) => {
        if (method === 'country') {
            const getStateData = await this.props.get_location_data({ action: 'states', countries_id: itemValue })
            const selectedItem = {
                id: itemValue,
                label: this.state.country_data[itemRow - 1].label
            }
            this.setState({
                state_data: getStateData.data,
                city_data: null,
                selected_country: selectedItem,
                selected_state: null,
                selected_city: null
            })
        } else if (method === 'state') {
            const getCityData = await this.props.get_location_data({ action: 'cities', states_id: itemValue })
            const selectedItem = {
                id: itemValue,
                label: this.state.state_data[itemRow - 1].label
            }
            this.setState({
                city_data: getCityData.data,
                selected_state: selectedItem,
                selected_city: null
            })
        } else if (method === 'city') {
            const selectedItem = {
                id: itemValue,
                label: this.state.city_data[itemRow - 1].label
            }
            await this.setState({
                selected_city: selectedItem
            })
        }

        if (this.state.selected_country && this.state.selected_state && this.state.selected_city) {
            this.setState({ isDisableModalButton: false })
        } else {
            this.setState({ isDisableModalButton: true })
        }
    }


    formatDate = (number) => {
        return number >= 10 ? number : "0" + number
    }


    handleOpenDatePicker = (type) => {
        if (type === 'startDate') {
            this.setState({ isOpenDatePickerStartDate: !this.state.isOpenDatePickerStartDate })
        } else {
            this.setState({ isOpenDatePickerEndDate: !this.state.isOpenDatePickerEndDate })
        }

    }

    handleDateInput = async (date, name) => {
        let timestamp = date.nativeEvent.timestamp
        let selectedDate = new Date(timestamp)
        let setMinimumDate = name === "startDate" && parseInt(timestamp) + (60 * 60 * 24 * 1000)
        selectedDate = this.formatDate((parseInt(selectedDate.getMonth())) + 1) + "/" + this.formatDate(selectedDate.getDate()) + "/" + selectedDate.getFullYear()

        if (timestamp) {
            await this.setState({
                [name]: selectedDate,
                startDateTimestamp: setMinimumDate,
                isOpenDatePickerStartDate: false,
                isOpenDatePickerEndDate: false
            })
        }

        if (this.state.startDate && this.state.endDate) {
            this.setState({ isDisableModalButton: false })
        } else {
            this.setState({ isDisableModalButton: true })
        }
    }

    handleTextFormInput = async (value, name) => {
        // if (name === 'offers' && !parseInt(value)) { // validate number
        //     return false
        // }


        await this.setState({
            [name]: value
        })


        if (this.state.offers !== '' && this.state.description !== '') {
            this.setState({ isDisableModalButton: false })
        } else {
            this.setState({ isDisableModalButton: true })
        }
    }

    handleConfirmFormAction = async () => {
        if (this.state.formPage < 3) {
            return this.setState({
                formPage: this.state.formPage + 1,
                isDisableModalButton: true
            })
        } else {
            const storage = await userStorage()

            const dataToSubmit = {
                sender_id: storage.id,
                sender_type: storage.typeCode,
                receiver_id: this.state.guidesData.id,
                country_id: this.state.selected_country.id,
                state_id: this.state.selected_state.id,
                city_id: this.state.selected_city.id,
                start_date: this.state.startDate,
                end_date: this.state.endDate,
                offers_price: this.state.offers,
                description: this.state.description,
            }

            const post = await this.props.post_user_request({ ...dataToSubmit })
            if (!post.err) {
                await this.props.chats_send_message({
                    receiver_id: this.state.guidesData.id,
                    receiver_type: 'G',
                    content: `Hello i'm ${storage.username}, ${this.state.description}!
                    `
                })
                alert("Success")
                this.handleOpenFormModal()
            } else {
                alert(post.err)
                this.handleOpenFormModal()
            }
        }

    }

    requestFormComponent = () => {
        const components = [
            (
                <View>
                    {/* COUNTRIES */}
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Country</Text>
                        <Picker
                            selectedValue={"js"}
                            style={styles.formPicker}
                            onValueChange={(val, row) => this.handleDestinationInput(val, row, "country")}
                        >
                            {
                                this.state.selected_country ?
                                    <Picker.Item label={this.state.selected_country.label} value="0" />
                                    :
                                    <Picker.Item label="Select Country" value="0" />
                            }

                            {
                                this.state.country_data && this.state.country_data.map(country => {
                                    return (
                                        <Picker.Item key={country.val} label={country.label} value={country.val} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                    {/* STATES */}
                    <View
                        style={styles.formItem}
                        pointerEvents={!this.state.selected_country ? 'none' : 'auto'}
                    >
                        <Text style={styles.formTitle}>State</Text>
                        <Picker
                            selectedValue={"js"}
                            style={{
                                ...styles.formPicker,
                                backgroundColor: !this.state.selected_country ? color.border : 'white'
                            }}
                            onValueChange={(val, row) => this.handleDestinationInput(val, row, "state")}
                        >
                            {
                                this.state.selected_state ?
                                    <Picker.Item label={this.state.selected_state.label} value="0" />
                                    :
                                    <Picker.Item label="Select State" value="0" />
                            }

                            {
                                this.state.state_data && this.state.state_data.map(states => {
                                    return (
                                        <Picker.Item key={states.val} label={states.label} value={states.val} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                    {/* CITIES */}
                    <View
                        style={styles.formItem}
                        pointerEvents={!this.state.selected_state ? 'none' : 'auto'}
                    >
                        <Text style={styles.formTitle}>City</Text>
                        <Picker
                            selectedValue={"js"}
                            style={{
                                ...styles.formPicker,
                                backgroundColor: !this.state.selected_state ? color.border : 'white'
                            }}
                            onValueChange={(val, row) => this.handleDestinationInput(val, row, "city")}
                        >
                            {
                                this.state.selected_city ?
                                    <Picker.Item label={this.state.selected_city.label} value="0" />
                                    :
                                    <Picker.Item label="Select City" value="0" />
                            }

                            {
                                this.state.city_data && this.state.city_data.map(cities => {
                                    return (
                                        <Picker.Item key={cities.val} label={cities.label} value={cities.val} />
                                    )
                                })
                            }
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
                                this.state.startDate ? this.state.startDate : "MM-DD-YYYY"
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
                                this.state.endDate ? this.state.endDate : "MM-DD-YYYY"
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
                            value={this.state.offers}
                            onChangeText={(value) => this.handleTextFormInput(value, 'offers')}
                        />
                    </View>
                    <View style={styles.formItem}>
                        <Text style={styles.formTitle}>Description</Text>
                        <TextInput
                            style={{ ...styles.textInput, textAlignVertical: 'top' }}
                            underlineColorAndroid="transparent"
                            placeholder="Type something here..."
                            multiline={true}
                            numberOfLines={4}
                            maxLength={500}
                            value={this.state.description}
                            onChangeText={(value) => this.handleTextFormInput(value, 'description')}
                        />
                    </View>
                </View>
            )

        ]

        return components[this.state.formPage - 1]
    }

    render() {
        const guides = this.state.guidesData
        return (
            this.state.guidesData ?
                <SafeAreaView style={styles.container}>
                    {
                        this.state.isOpenForm &&
                        <Modal
                            modalHeader={"Request Form"}
                            formComponent={this.requestFormComponent}
                            buttonLabel={this.state.formPage === 3 ? "Submit" : "Next"}
                            disabled={this.state.isDisableModalButton}
                            onClose={this.handleOpenFormModal}
                            onConfirm={this.handleConfirmFormAction}
                        />
                    }

                    <View style={styles.viewArea}>
                        <ScrollView style={styles.container}>
                            <Carousel
                                imageArr={[this.state.guidesData.image]}
                                options={{ height: 320 }}
                            />
                            <View style={styles.headerBox}>
                                <Text style={styles.headerName}>{guides.username}</Text>
                                <Text style={styles.headerPrice}>{guides.city + ", " + guides.country}</Text>
                                <View style={styles.headerRating}>
                                    <Rating
                                        type='custom'
                                        ratingCount={5}
                                        imageSize={16}
                                        startingValue={parseInt(guides.rating)}
                                        readonly={true}
                                        style={styles.rating}
                                    />
                                    <Text style={styles.ratingLabel}>{guides.total_tours} Trip</Text>
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
                                    <Text style={styles.profileData}>{guides.email}</Text>
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
                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
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
                :
                <Spinner />
        )
    }
}


const mapStateToProps = createStructuredSelector({
})

const mapDispatchToProps = (dispatch) => ({
    get_tours_guides_detail: (data) => dispatch(get_tours_guides_detail(data)),
    get_location_data: (data) => dispatch(get_location_data(data)),
    post_user_request: (data) => dispatch(post_user_request(data)),
    chats_send_message: (data) => dispatch(chats_send_message(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuideDetails);
