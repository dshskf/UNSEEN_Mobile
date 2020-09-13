import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';


const DropDown = props => {
    return (
        <DropDownPicker
            items={[
                { label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
                { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
            ]}
            defaultValue={'france'}
            containerStyle={{ height: 40 }}
            style={props.style}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={props.handler}
            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"
        />
    )
}

export default DropDown