import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface Device {
  name: string;
}

const ConnectedDeviceScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isConnectivityOn, setConnectivityOn] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const connectedDevice = { name: 'Device Name' };
  const availableDevices = [
    { name: 'Device Name' },
    { name: 'Device Name' },
    { name: 'Device Name' },
  ];

  const connectedDevicesList = [
    { name: 'Device Name' },
    { name: 'Device Name' },
    { name: 'Device Name' },
    { name: 'Device Name' },
    { name: 'Device Name' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connected Devices</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'All' && styles.activeTab]}
            onPress={() => setActiveTab('All')}
          >
            <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Connected' && styles.activeTab]}
            onPress={() => setActiveTab('Connected')}
          >
            <Text style={[styles.tabText, activeTab === 'Connected' && styles.activeTabText]}>Connected</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.connectivityContainer}>
          <Text style={styles.connectivityText}>Devices Connectivity (ON)</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81d8d0' }}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setConnectivityOn(previousState => !previousState)}
            value={isConnectivityOn}
          />
        </View>

        {activeTab === 'All' && (
          <>
            <View style={styles.myDeviceSection}>
              <Text style={styles.sectionTitle}>My device name</Text>
              <Text style={styles.deviceNameText}>Device Name</Text>
            </View>

            <View style={styles.deviceListSection}>
              <Text style={styles.sectionTitle}>Connected Device</Text>
              <View style={[styles.deviceItem, styles.connectedDeviceItem]}>
                <MaterialCommunityIcons name="watch" size={24} color="#3EC6C9" />
                <Text style={styles.deviceItemText}>{connectedDevice.name}</Text>
                <TouchableOpacity style={styles.disconnectButton}>
                  <Text style={styles.buttonText}>Disconnect</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.deviceListSection}>
              <TouchableOpacity style={styles.pairNewDevice}>
                <Ionicons name="add-circle-outline" size={24} color="#3EC6C9" />
                <Text style={styles.pairNewDeviceText}>Pair new device</Text>
              </TouchableOpacity>
              {availableDevices.map((device, index) => (
                <View key={index} style={styles.deviceItem}>
                  <MaterialCommunityIcons name="watch" size={24} color="#3EC6C9" />
                  <Text style={styles.deviceItemText}>{device.name}</Text>
                  <TouchableOpacity style={styles.pairButton}>
                    <Text style={styles.buttonText}>Pair</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <Text style={styles.footerText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
          </>
        )}

        {activeTab === 'Connected' && (
          <View style={styles.deviceListSection}>
            {connectedDevicesList.map((device, index) => (
              <TouchableOpacity
                key={index}
                style={styles.deviceItem}
                onPress={() => {
                  setSelectedDevice(device);
                  setModalVisible(true);
                }}
              >
                <MaterialCommunityIcons name="watch" size={24} color="#3EC6C9" />
                <Text style={styles.deviceItemText}>{device.name}</Text>
                <Ionicons name="settings-outline" size={24} color="#777" />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <DeviceConnectionModal
        visible={isModalVisible}
        device={selectedDevice}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    transform: [{ translateX: -24 }],
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#3EC6C9',
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  connectivityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  connectivityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  myDeviceSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  deviceNameText: {
    fontSize: 14,
    color: '#777',
  },
  deviceListSection: {
    marginTop: 30,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  connectedDeviceItem: {
    borderColor: '#3EC6C9',
    borderWidth: 1,
  },
  deviceItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  disconnectButton: {
    backgroundColor: '#3EC6C9',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  pairButton: {
    backgroundColor: '#d4f5f2',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#3EC6C9',
    fontWeight: 'bold',
  },
  pairNewDevice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pairNewDeviceText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#3EC6C9',
    fontWeight: '600',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
    textAlign: 'left',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '85%',
  },
  modalIconContainer: {
    backgroundColor: '#e6f8f8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  modalDeviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  connectButton: {
    backgroundColor: '#3EC6C9',
  },
  cancelButtonText: {
    color: '#3EC6C9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editViewContainer: {
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 15,
  },
  editTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  editDescription: {
    fontSize: 12,
    color: '#999',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#3EC6C9',
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const DeviceConnectionModal = ({ visible, device, onClose }: { visible: boolean; device: Device | null; onClose: () => void }) => {
  const [isEditView, setEditView] = useState(false);
  const [deviceName, setDeviceName] = useState(device?.name || '');

  React.useEffect(() => {
    if (device) {
      setDeviceName(device.name);
    }
    if (!visible) {
      // Reset view when modal is closed
      setTimeout(() => setEditView(false), 300); // Delay to allow fade out animation
    }
  }, [device, visible]);

  if (!device) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              {isEditView && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              )}

              <View style={styles.modalIconContainer}>
                <MaterialCommunityIcons name="watch" size={32} color="#3EC6C9" />
              </View>
              <Text style={styles.modalDeviceName}>{device.name}</Text>

              {!isEditView ? (
                <>
                  <Text style={styles.modalDescription}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.connectButton]} onPress={() => setEditView(true)}>
                      <Text style={styles.connectButtonText}>Connect</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={styles.editViewContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.editTitle}>Edit Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={deviceName}
                    onChangeText={setDeviceName}
                    placeholder="Device Name"
                  />
                  <Text style={styles.editDescription}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  </Text>
                  <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={[styles.modalButton, styles.deleteButton]} onPress={onClose}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onClose}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConnectedDeviceScreen;
