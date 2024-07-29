import React, {useState} from "react";

import regularFont from '../fonts/DMSans-Regular.ttf';
import mediumFont from '../fonts/DMSans-Medium.ttf'
import boldFont from '../fonts/DMSans-Bold.ttf';
import QRCode from 'qrcode';
import {Document, Font, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';


Font.register({
    family: 'DMSans-Medium',
    format: "truetype",
    src: mediumFont,
});

Font.register({
    family: 'DMSans-Regular',
    format: "truetype",
    src: regularFont,
});

Font.register({
    family: 'DMSans-Bold',
    format: "truetype",
    src: boldFont,
});

const styles = StyleSheet.create({
  container: {
    margin: 'auto',
    flexDirection: 'column',
    height: 200,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    flexDirection: 'column',
    background: '#f2f4f7',
    padding: '38px 24px',
    gap: '12px',
    backgroundColor: '#f2f4f7',
  },
  titleText: {
    fontFamily: 'DMSans-Bold',
    fontSize: 14,
    letterSpacing: 2.14,
    color: '#2575F0',
  },
  titleText1: {
    fontSize: 22,
    fontFamily: 'DMSans-Medium',
    color: '#101828',
  },
  //User Informations
  userInfoContainer: {
    padding: '32px 24px',
    flexDirection: 'column',
    gap: '15px',
    borderBottom: '1px solid #e4e7ec',
  },
  userInfoItem: {
    flexDirection: 'row',
  },
  userInfoLabel: {
    width: 240,
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#344054',
  },
  userInfoValue: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#475467',
  },
  // Ticket Information
  ticketInfoContainer: {
    padding: '0 24px',
    paddingTop: '32px',
    paddingBottom: '8px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e4e7ec',
  },
  ticketInfo: {
    flexDirection: 'column',
    gap: '15px',
  },
  ticketInfoHeader: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#344054',
  },
  ticketInfoItem: {
    flexDirection: 'row',
  },
  ticketInfoLabel: {
    width: 240,
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#344054',
  },
  ticketInfoValue: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    color: '#475467',
  },
  ticketInfoValue1: {
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    color: '#475467',
  },
  qrCodeContainer: {
    width: 178,
    height: 178,
  },

  //Footer
  footerContainer: {
    padding: '24px 40px',
    flexDirection: 'column',
    gap: '12px',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#667085',
    textAlign: 'center',
  },
  footerLink: {
    color: '#2575F0',
  },
});

const DownloadTicket1 = (props) => {
    const {
        title = "North Africa Dreamin' 2023",
        date = 'Fri, Sep 1, 2023  18:30AM',
        locationType = 'Farah Hotel, Casablanca',
        location = 'Farah Hotel, Casablanca',
        price = 0,
        name = 'Cameron Williamson',
        address = '2715 Ash Dr. San Jose, South Dakota 83475',
        email = 'janelle.champlin@hotmail.com',
        ticketNumber = 1,
        TicketCode = 'NAD00345',
      } = props;
      
      const [imageUrl , setImageUrl] = useState(' ');

      const generateQRCodeImageSource = async (data) => {
        try {
          return await QRCode.toDataURL(data);
        } catch (error) {
          console.error('Erreur lors de la génération du code QR :', error);
          return ''; 
        }
      };
    
      React.useEffect(() => {
        generateQRCodeImageSource(title).then((source) => setImageUrl(source));
      }, [title]);

    
    return(
        <Document>
        <Page size={[920, 608]} style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>#432-092</Text>
            <Text style={styles.titleText1}>{title}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Your Name</Text>
              <Text style={styles.userInfoValue}>{name}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Address</Text>
              <Text style={styles.userInfoValue}>{address}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Email</Text>
              <Text style={styles.userInfoValue}>{email}</Text>
            </View>
          </View>
          <View style={styles.ticketInfoContainer}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketInfoHeader}>Your Ticket</Text>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoLabel}>{ticketNumber} x</Text>
                <Text style={styles.ticketInfoValue1}>{title}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoLabel}>Date</Text>
                <Text style={styles.ticketInfoValue}>{date}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoLabel}>Location</Text>
                <Text style={styles.ticketInfoValue}>{location}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoLabel}>Ticket Code</Text>
                <Text style={styles.ticketInfoValue}>{TicketCode}</Text>
              </View>
            </View>
            <View style={styles.qrCodeContainer}>
              <Image src={imageUrl} />
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              The{' '}
              <Text style={styles.footerLink}>Ticket Terms and Conditions</Text> apply to the booking of all Event{' '}
              tickets to the exclusion of all other terms and conditions.
            </Text>
            <Text style={styles.footerText}>
              Need Assistance? If you have any questions or need assistance, feel free to contact our support team at{' '}
              <Text style={styles.footerLink}>support@digitalmorocco.com</Text>.
            </Text>
          </View>
        </Page>
      </Document>
    )
}

export default DownloadTicket1;
