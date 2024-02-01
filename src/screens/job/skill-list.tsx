import React from 'react';
import { ScrollView } from 'react-native';
import SkillTag from 'src/screens/job/skills-tag'; // Import the SkillTag component

import { View } from '@/ui';

const SkillsList = () => {
  const skills = [
    'Industry Knowldge',
    'React Native',
    'Node.js',
    'CSS',
    'UI/UX',
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View flexDirection={'row'} alignItems={'center'}>
        {skills.map((skill, index) => (
          <SkillTag key={index} skill={skill} />
        ))}
      </View>
    </ScrollView>
  );
};

export default SkillsList;
