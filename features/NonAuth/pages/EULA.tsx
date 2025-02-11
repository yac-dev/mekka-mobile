import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const conditions = [
  {
    title: 'Purpose of the app',
    description: 'Lampole is a platform for fun and collaborative photo or video sharing among close friends.',
  },
  {
    title: 'License Grant',
    description:
      'Lampole hereby grants you a personal, non-transferable, non-exclusive licence to use the Lampole software on your devices in accordance with the terms of this EULA agreement. You are permitted to load the Lampole software(for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the Lampole software. You are not permitted to:',
  },
  {
    title: 'Objectionable Content and Abusive Users',
    description:
      'You understand and agree that the App may contain content that is offensive, inappropriate, or otherwise objectionable. You also understand and agree that there is no tolerance for abusive users in the App. Lampole reserves the right to remove any content or block any user that violates this Agreement or any applicable laws.',
  },
  {
    title: 'User-Generated Content',
    description:
      'You acknowledge that any content that you upload or post on the App, including but not limited to photos and videos, is your responsibility and you represent and warrant that you have all necessary rights to the content. You grant Lampole a worldwide, non-exclusive, transferable, royalty-free, perpetual license to use, copy,modify, create derivative works from, distribute, sublicense, and display the content in connection with the App.',
  },
  {
    title: 'Proprietary Rights',
    description:
      'You acknowledge and agree that the App, and any necessary software used in connection with the App, containsproprietary and confidential information that is protected by applicable intellectual property and other laws.You also acknowledge and agree that the content contained in the App or in advertisements displayed in the App is protected by copyrights, trademarks, service marks, patents, or other proprietary rights and laws. Except as expressly authorized by Lampole, you agree not to modify, rent, lease, loan, sell, distribute, or create derivative works based on the App or the content contained therein, in whole or in part.',
  },
  {
    title: 'Disclaimer of Warranties',
    description:
      'The App is provided on an “as is” basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. Lampole does not warrant that the App will meet your requirements, or that the operation of the App will beuninterrupted or error-free.',
  },
  {
    title: 'Limitation of Liability',
    description:
      'To the maximum extent permitted by law, Lampole shall not be liable for any damages whatsoever, including but not limited to direct, indirect, incidental, special, consequential, or exemplary damages, arising out of or in connection with your use of the App.',
  },
  {
    title: 'Indemnification',
    description:
      "You agree to indemnify and hold Lampole, its affiliates, officers, agents, employees, and partners harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the App, your violation of this Agreement, or your violation of any rights of another.",
  },
];

const licenceGrantPermissions = [
  'Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things',
  'Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose',
  'Allow any third party to use the Software on behalf of or for the benefit of any third party',
  'Use the Software in any way which breaches any applicable local, national or international law',
  'Use the Software for any purpose that Lampole considers is a breach of this EULA agreement',
];

export const EULA = () => {
  const renderLicenceGrantPermissons = () => {
    const list = licenceGrantPermissions.map((permisson, index) => {
      return (
        <Text
          key={index}
          style={{ color: 'rgb(170,170,170)', fontSize: 17, lineHeight: 25 }}
        >{`\u2022 ${permisson}`}</Text>
      );
    });

    return <View style={{ paddingLeft: 15 }}>{list}</View>;
  };

  const renderConditions = () => {
    const list = conditions.map((condition, index) => {
      return (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>
            {index + 1}.&nbsp;
            {condition.title}
          </Text>
          <Text style={{ color: 'rgb(170,170,170)', fontSize: 17, lineHeight: 25 }}>{condition.description}</Text>
          {index === 1 ? renderLicenceGrantPermissons() : null}
        </View>
      );
    });

    return <View>{list}</View>;
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        End User License Agreement of Lampole
      </Text>
      <Text style={{ color: 'rgb(170,170,170)', fontSize: 17, marginBottom: 10, lineHeight: 25 }}>
        This End User License Agreement (“Agreement”) is a legally binding agreement between you (“End User” or “you”)
        and Lampole. By downloading, installing, accessing, or using the App, you agree to be bound by the terms and
        conditions of this Agreement. If you do not agree to the terms of this Agreement, do not download, install,
        access, or use the App.
      </Text>
      {renderConditions()}
    </ScrollView>
  );
};
