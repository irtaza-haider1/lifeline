import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';


const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [isShareModalVisible, setShareModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for profile picture
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Elsa John</Text>
        <Text style={styles.profileEmail}>danilo@gmail.com</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => router.push('/(main)/editProfile')}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        <SettingItem icon="account-outline" text="Account Details" onPress={() => {}} />
        <SettingItem icon="cog-outline" text="Settings" onPress={() => {}} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PAYMENT DETAILS</Text>
        <SettingItem icon="credit-card-outline" text="Subscription Details" onPress={() => router.push('/(main)/subscription')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.settingItemContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="history" size={24} color="#555" style={styles.icon} />
                <Text style={styles.settingItemText}>Activities Notifications</Text>
            </View>
            <Switch
                trackColor={{ false: '#767577', true: '#3EC6C9' }}
                thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNotifications(previousState => !previousState)}
                value={notifications}
            />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SECURITY</Text>
        <SettingItem icon="file-document-outline" text="Terms and Conditions" onPress={() => router.push('/(main)/terms')} />
        <SettingItem icon="shield-lock-outline" text="Privacy Policy" onPress={() => router.push('/(main)/PrivacyPolicy')} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>OTHERS</Text>
        <SettingItem icon="message-alert-outline" text="Feedback" onPress={() => {}} />
        <SettingItem icon="share-variant-outline" text="Share App" onPress={() => setShareModalVisible(true)} />
        <SettingItem icon="star-outline" text="Rate App" onPress={() => {}} />
        <SettingItem icon="logout" text="Log out" onPress={() => {}} textStyle={{color: 'red'}}/>
      </View>

      <ShareModal
        visible={isShareModalVisible}
        onClose={() => setShareModalVisible(false)}
      />
    </ScrollView>
  );
};

interface SettingItemProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  text: string;
  onPress: () => void;
  textStyle?: object;
}

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose }) => {
  const socialApps: { name: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string }[] = [
    { name: 'Facebook', icon: 'facebook', color: '#3b5998' },
    { name: 'X', icon: 'twitter', color: '#000000' },
    { name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
    { name: 'Skype', icon: 'skype', color: '#00aff0' },
    { name: 'Telegram', icon: 'send', color: '#0088cc' },
    { name: 'Pinterest', icon: 'pinterest', color: '#E60023' },
    { name: 'Instagram', icon: 'instagram', color: '#C13584' },
    { name: 'Messenger', icon: 'facebook-messenger', color: '#00B2FF' },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.handlebar} />
              <View style={styles.gridContainer}>
                {socialApps.map(app => (
                  <TouchableOpacity key={app.name} style={styles.gridItem}>
                    <View style={[styles.iconContainer, { backgroundColor: app.color }]}>
                      <MaterialCommunityIcons name={app.icon} size={32} color="#fff" />
                    </View>
                    <Text style={styles.appName}>{app.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const SettingItem: React.FC<SettingItemProps> = ({ icon, text, onPress, textStyle }) => (
  <TouchableOpacity style={styles.settingItemContainer} onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons name={icon} size={24} color="#555" style={styles.icon} />
        <Text style={[styles.settingItemText, textStyle]}>{text}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#555" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    
  },
  profileImageContainer: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    borderColor: 'rgba(62, 198, 201, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  editProfileButton: {
    flexDirection: 'row',
    backgroundColor: '#3EC6C9',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3EC6C9',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  settingItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  handlebar: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  gridItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 24,
  }
});

export default SettingsScreen;
