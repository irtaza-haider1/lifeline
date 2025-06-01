import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Limitation options
const limitationOptions = [
  { id: 1, title: 'Back Pain' },
  { id: 2, title: 'Knee Pain' },
  { id: 3, title: 'Arthritis' },
  { id: 4, title: 'Shoulder Injury' },
  { id: 5, title: 'Limited Mobility' },
  { id: 6, title: 'Asthma' },
  { id: 7, title: 'Obesity' },
  { id: 8, title: 'None' },
];

export default function LimitationScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLimitations, setSelectedLimitations] = useState<number[]>([1, 6, 7]); // Default to Back Pain, Asthma, Obesity
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchBlur = () => {
    // Keep dropdown open if there's text in the search field
    if (!searchQuery) {
      setShowDropdown(false);
    }
  };

  const handleLimitationSelect = (limitationId: number) => {
    // Toggle selection
    if (selectedLimitations.includes(limitationId)) {
      setSelectedLimitations(selectedLimitations.filter(id => id !== limitationId));
    } else {
      setSelectedLimitations([...selectedLimitations, limitationId]);
    }
  };

  const handleRemoveLimitation = (limitationId: number) => {
    setSelectedLimitations(selectedLimitations.filter(id => id !== limitationId));
  };

  const filteredLimitations = limitationOptions.filter(
    limitation => limitation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    // Navigate to the focusArea screen
    router.push('/focusArea');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top right corner circle */}
      <View style={styles.topCircle} />
      
      {/* Bottom left corner circle */}
      <View style={styles.bottomCircle} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/running.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.contentWrapper}>
        {/* Glass container */}
        <View style={styles.glassContainer}>
          <BlurView intensity={70} tint="light" style={styles.blurView}>
            <View style={styles.glassContent}>
              <View style={styles.titleContainer}>
                <View style={styles.titleLine} />
                <Text style={styles.title}>Do you have any physical{'\n'}limitations?</Text>
              </View>
              
              <View style={styles.searchContainer}>
                {/* Search input */}
                <View style={styles.searchInputContainer}>
                  <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />
                </View>
                
                {/* Selected limitations tags */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.selectedTagsContainer}
                  contentContainerStyle={styles.selectedTagsContent}
                >
                  {selectedLimitations.map(id => {
                    const limitation = limitationOptions.find(item => item.id === id);
                    if (!limitation) return null;
                    
                    return (
                      <View key={id} style={styles.selectedTag}>
                        <Text style={styles.selectedTagText}>{limitation.title}</Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveLimitation(id)}
                          style={styles.removeTagButton}
                        >
                          <Text style={styles.removeTagButtonText}>×</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
                
                {/* Dropdown list */}
                {showDropdown && (
                  <View style={styles.dropdownContainer}>
                    <ScrollView style={styles.dropdownList}>
                      {filteredLimitations.map(limitation => (
                        <TouchableOpacity
                          key={limitation.id}
                          style={[
                            styles.dropdownItem,
                            selectedLimitations.includes(limitation.id) && styles.selectedDropdownItem
                          ]}
                          onPress={() => handleLimitationSelect(limitation.id)}
                        >
                          <Text 
                            style={[
                              styles.dropdownItemText,
                              selectedLimitations.includes(limitation.id) && styles.selectedDropdownItemText
                            ]}
                          >
                            {limitation.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
              
              {/* Continue button */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderBottomLeftRadius: 100,
    zIndex: -1,
  },
  bottomCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: '#00B3B3',
    borderTopRightRadius: 100,
    zIndex: -1,
  },
  logoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 80,
    height: 30,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  glassContainer: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  blurView: {
    flex: 1,
    borderRadius: 25,
  },
  glassContent: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#00B3B3',
    marginBottom: 15,
    borderRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  selectedTagsContainer: {
    marginTop: 15,
    maxHeight: 40,
  },
  selectedTagsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00B3B3',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  selectedTagText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  removeTagButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeTagButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 10,
  },
  dropdownList: {
    flex: 1,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedDropdownItem: {
    backgroundColor: '#e6f9f9',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDropdownItemText: {
    color: '#00B3B3',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#00B3B3',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 