package com.email.audit;

import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Mailer {

	public static void SendToQm(String to, String tmName, String AgentName,
			String type, String year, String quarter) {

		String from = "devmanila@thomsonreuters.com";
		String host = "mailhub.tfn.com";

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);

		try {
			MimeMessage message = new MimeMessage(session);
			StringBuilder msgBody = new StringBuilder();
			msgBody.append("You have a new <strong>" + type
					+ "</strong> request from <b>");
			msgBody.append(tmName);
			msgBody.append("</b>");
			msgBody.append(" for the quarter number " + quarter + " year");
			msgBody.append(" " + year);
			msgBody.append("<p>");
			msgBody.append("<p>&nbsp;</p>");
			msgBody.append("This Message has been generated form the iPerform tool.");

			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));
			message.setSubject("No Reply : New Request from " + tmName);
			message.setContent(msgBody.toString(), "text/html");
			Transport.send(message);

		} catch (Exception e) {
			e.getMessage();
		}
	}

	public static void SendToTm(String to, String type, String target,
			String quarter, String Year) {

	}

	public static void SendToTmFRomEmployeeUpdate(String to, String type, String employeeName,
			String start_date, String newTarget, String quarter, String year,String tmName) {
			
		String from = "devmanila@thomsonreuters.com";
		String host = "mailhub.tfn.com";

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);
  
		try {
			MimeMessage message = new MimeMessage(session);
			StringBuilder msgBody = new StringBuilder();
			msgBody.append("<body bgcolor='#ffffff'>");
			msgBody.append("<table width='100%' cellspacing='0' cellpadding='0' bgcolor='#ffffff'>");
			msgBody.append("<tr><td><table width='600' border='0' cellspacing='0' cellpadding='0' bgcolor='#FFFFFF' align='center'>");
			msgBody.append(" <tr><td><table width='100%' frame='box' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append(" <tr><td width='393'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr bgcolor='#0083BF'><td height='46' align='right' valign='middle'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr><td width='67%' align='right'><font style='color:#68696a; font-size:8px; text-transform:uppercase'></font></td>");
			msgBody.append("<td width='29%' align='right'><font style='color:#68696a; font-size:8px'></font></td>");
			msgBody.append("<td width='4%'>&nbsp;</td>");
			msgBody.append("</tr></table></td>");
			
			msgBody.append("</tr><tr><td height='30'><img src='http://localhost:5050/rostermgt/NOTIFICATION%20ORANGE/images/PROMO-GREEN2_01_04.jpg' width='620' height='30' border='0' alt=''/></td></tr>");
			msgBody.append("</table></td></tr></table></td></tr><tr><td align='center'>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append(" <td><table width='100%' frame='box' cellspacing='0' cellpadding='0'> <tr><td width='10%'>&nbsp;</td>");
			msgBody.append("<td width='80%' align='left' valign='top'><font style='color:#a1a1a1; font-size:24px'><strong><em>Hi " + tmName +",</em></strong></font><br />");
			msgBody.append("<font style='color:#a1a1a1; font-size:13px; line-height:21px'>");
			msgBody.append("<br /><br /> <strong>" + employeeName + "</strong> has been added to your roster. Please ensure to request their new target for the quarter " + quarter + " of year " + year + ".<br /> <br /><br />Thanks </font><br /><br /></td><td width='10%'>&nbsp;</td></tr><tr><td>&nbsp;</td>");
			msgBody.append(" <td align='left' valign='top'><table width='108' border='0' cellspacing='0' cellpadding='0'><tr>");
			msgBody.append("<td></td></tr>");
			msgBody.append("<tr><td valign='middle' bgcolor='#fabc89 '><font style=' color:#ffffff; font-size:14px'><em><a href='javascript:void(0);' target='_blank' style='color:#ffffff; text-decoration: underline'></a></em></font></td></tr>");
			msgBody.append("<tr style='margin:5px;'> <td bgcolor='#f68121'><font style='color:#ffffff; font-size:15px'><strong><a href='javascript:void(0);' style='color:#ffffff; text-decoration:none'><em>Manila Development Team</em></a></strong></font></td></tr>");
                 
			msgBody.append(" <tr><td height='10' bgcolor='#f68121'> </td></tr></table></td><td>&nbsp;</td></tr></table></td></tr>");
			msgBody.append("</tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append("<td></td>");
			msgBody.append("</tr><tr bgcolor='#0083BF' height='18'><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr bgcolor='#0083BF'><td align='center'><font style='color:#ffffff; font-size:8px'><strong></a></strong></font></td></tr><tr><td>&nbsp;</td></tr></table></td></tr></table>");
			
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));  
			message.setSubject("No Reply : Roster Change");
			message.setContent(msgBody.toString(), "text/html");
			Transport.send(message); 

		} catch (Exception e) {
			e.getMessage();
		}
		
	}
	
	public static void SendToTmFRomTransferHead(String to, String type, String employeeName,
			String start_date, String newTarget, String quarter, String year,String tmName,String reasonTm) {
			
		String from = "devmanila@thomsonreuters.com";
		String host = "mailhub.tfn.com";

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);
  
		try {
			MimeMessage message = new MimeMessage(session);
			StringBuilder msgBody = new StringBuilder();
			msgBody.append("<body bgcolor='#ffffff'>");
			msgBody.append("<table width='100%' cellspacing='0' cellpadding='0' bgcolor='#ffffff'>");
			msgBody.append("<tr><td><table width='600' border='0' cellspacing='0' cellpadding='0' bgcolor='#FFFFFF' align='center'>");
			msgBody.append(" <tr><td><table width='100%' frame='box' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append(" <tr><td width='393'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr bgcolor='#0083BF'><td height='46' align='right' valign='middle'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr><td width='67%' align='right'><font style='color:#68696a; font-size:8px; text-transform:uppercase'></font></td>");
			msgBody.append("<td width='29%' align='right'><font style='color:#68696a; font-size:8px'></font></td>");
			msgBody.append("<td width='4%'>&nbsp;</td>");
			msgBody.append("</tr></table></td>");
			
			msgBody.append("</tr><tr><td height='30'><img src='http://localhost:5050/rostermgt/NOTIFICATION%20ORANGE/images/PROMO-GREEN2_01_04.jpg' width='620' height='30' border='0' alt=''/></td></tr>");
			msgBody.append("</table></td></tr></table></td></tr><tr><td align='center'>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append(" <td><table width='100%' frame='box' cellspacing='0' cellpadding='0'> <tr><td width='10%'>&nbsp;</td>");
			msgBody.append("<td width='80%' align='left' valign='top'><font style='color:#a1a1a1; font-size:24px'><strong><em>Hi " + tmName +",</em></strong></font><br />");
			msgBody.append("<font style='color:#a1a1a1; font-size:13px; line-height:21px'>");
			msgBody.append("<br /><br /> <strong>" + employeeName + "</strong> has been added to your roster. Please ensure to request their new target for the quarter " + quarter + " of year " + year + ".<br /> <br /><br />Thanks </font><br /><br /></td><td width='10%'>&nbsp;</td></tr><tr><td>&nbsp;</td>");
			msgBody.append(" <td align='left' valign='top'><table width='108' border='0' cellspacing='0' cellpadding='0'><tr>");
			msgBody.append("<td></td></tr>");
			msgBody.append("<tr><td valign='middle' bgcolor='#fabc89 '><font style=' color:#ffffff; font-size:14px'><em><a href='javascript:void(0);' target='_blank' style='color:#ffffff; text-decoration: underline'></a></em></font></td></tr>");
			msgBody.append("<tr style='margin:5px;'> <td bgcolor='#f68121'><font style='color:#ffffff; font-size:15px'><strong><a href='javascript:void(0);' style='color:#ffffff; text-decoration:none'><em>Manila Development Team</em></a></strong></font></td></tr>");
                 
			msgBody.append(" <tr><td height='10' bgcolor='#f68121'> </td></tr></table></td><td>&nbsp;</td></tr></table></td></tr>");
			msgBody.append("</tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append("<td></td>");
			msgBody.append("</tr><tr bgcolor='#0083BF' height='18'><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr bgcolor='#0083BF'><td align='center'><font style='color:#ffffff; font-size:8px'><strong></a></strong></font></td></tr><tr><td>&nbsp;</td></tr></table></td></tr></table>");
			
			message.setFrom(new InternetAddress(from));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));  
			message.setSubject("No Reply : Roster Change");
			message.setContent(msgBody.toString(), "text/html");
			Transport.send(message);

		} catch (Exception e) {
			e.getMessage();
		}
		
	}
	public static void SendToPSM(String to, String tmName, String employeeName, String quarter,String year) {
			
		String from = "devmanila@thomsonreuters.com";
		String host = "mailhub.tfn.com";

		Properties properties = System.getProperties();
		properties.setProperty("mail.smtp.host", host);
		Session session = Session.getDefaultInstance(properties);
  
		try {
			MimeMessage message = new MimeMessage(session);
			StringBuilder msgBody = new StringBuilder();
			msgBody.append("<body bgcolor='#ffffff'>");
			msgBody.append("<table width='100%' cellspacing='0' cellpadding='0' bgcolor='#ffffff'>");
			msgBody.append("<tr><td><table width='600' border='0' cellspacing='0' cellpadding='0' bgcolor='#FFFFFF' align='center'>");
			msgBody.append(" <tr><td><table width='100%' frame='box' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append(" <tr><td width='393'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr bgcolor='#0083BF'><td height='46' align='right' valign='middle'><table width='100%' border='0' cellspacing='0' cellpadding='0'>");
			msgBody.append("<tr><td width='67%' align='right'><font style='color:#68696a; font-size:8px; text-transform:uppercase'></font></td>");
			msgBody.append("<td width='29%' align='right'><font style='color:#68696a; font-size:8px'></font></td>");
			msgBody.append("<td width='4%'>&nbsp;</td>");
			msgBody.append("</tr></table></td>");
			
			msgBody.append("</tr><tr><td height='30'><img src='http://localhost:5050/rostermgt/NOTIFICATION%20ORANGE/images/PROMO-GREEN2_01_04.jpg' width='620' height='30' border='0' alt=''/></td></tr>");
			msgBody.append("</table></td></tr></table></td></tr><tr><td align='center'>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append(" <td><table width='100%' frame='box' cellspacing='0' cellpadding='0'> <tr><td width='10%'>&nbsp;</td>");
			msgBody.append("<td width='80%' align='left' valign='top'><font style='color:#a1a1a1; font-size:24px'><strong><em>Hi ,</em></strong></font><br />");
			msgBody.append("<font style='color:#a1a1a1; font-size:13px; line-height:21px'>");
			msgBody.append("<br /><br /> <strong>" + employeeName + "</strong> has been added to " +tmName+ "'s roster. Please check their new target for the quarter " + quarter + " of year " + year + ".<br /> <br /><br />Thanks </font><br /><br /></td><td width='10%'>&nbsp;</td></tr><tr><td>&nbsp;</td>");
			msgBody.append(" <td align='left' valign='top'><table width='108' border='0' cellspacing='0' cellpadding='0'><tr>");
			msgBody.append("<td></td></tr>");
			msgBody.append("<tr><td valign='middle' bgcolor='#fabc89 '><font style=' color:#ffffff; font-size:14px'><em><a href='javascript:void(0);' target='_blank' style='color:#ffffff; text-decoration: underline'></a></em></font></td></tr>");
			msgBody.append("<tr style='margin:5px;'> <td bgcolor='#f68121'><font style='color:#ffffff; font-size:15px'><strong><a href='javascript:void(0);' style='color:#ffffff; text-decoration:none'><em>Manila Development Team</em></a></strong></font></td></tr>");
                 
			msgBody.append(" <tr><td height='10' bgcolor='#f68121'> </td></tr></table></td><td>&nbsp;</td></tr></table></td></tr>");
			msgBody.append("</tr><tr><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr>");
			msgBody.append("<td></td>");
			msgBody.append("</tr><tr bgcolor='#0083BF' height='18'><td>&nbsp;</td></tr><tr><td>&nbsp;</td></tr><tr bgcolor='#0083BF'><td align='center'><font style='color:#ffffff; font-size:8px'><strong></a></strong></font></td></tr><tr><td>&nbsp;</td></tr></table></td></tr></table>");
			
			message.setFrom(new InternetAddress(from));  
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(
					to));  
			message.setSubject("No Reply : Roster Change");
			message.setContent(msgBody.toString(), "text/html");
			Transport.send(message);

		} catch (Exception e) {
			e.getMessage();
		}
		
	}
}
