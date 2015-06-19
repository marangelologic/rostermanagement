package com.tm.qa.model.email;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.email.audit.Mailer;
import com.qa.model.QmEmails;

/**
 * Servlet implementation class EmailToTm
 */
@WebServlet("/EmailToTm")
public class EmailToTm extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public EmailToTm() {
		super();
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// javax.naming.InitialContext ctx = null;

		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
			JSONObject jsonObj;
			jsonObj = new JSONObject(jsonParameters);
			String tmId = jsonObj.optString("tmId", "");
			String signature = jsonObj.optString("signature", "");
			String agentName = jsonObj.optString("agentName", "");
			String to = jsonObj.optString("to", "");
			String type = jsonObj.optString("type", "");
			String agentId = jsonObj.optString("agentId", "");
			String tmNames = jsonObj.optString("tmNames", "");
			String quarter = jsonObj.optString("quarter", "");
			String target = jsonObj.optString("target", "");
			String year = jsonObj.optString("year", "");
			String start_date = jsonObj.optString("year", "");
			String newTarget = jsonObj.optString("year", "");
			String reasonTm = jsonObj.optString("reasonTm", "");

			switch (signature) {
			case "toQm":
				Iterator<String> qmIterator = QmEmails.qmEmails().iterator();
				while (qmIterator.hasNext()) {
					Mailer.SendToQm(qmIterator.next(), tmNames, agentName,
							type, year, quarter);
				}
				break;
			case "toTMFromEmployeeUpdate":
				GetTmInfo(tmId);
				Mailer.SendToTmFRomEmployeeUpdate(
						GetTmInfo(tmId), type,
						agentName, start_date, newTarget, quarter, year,
						tmNames);
				break;
			case "toTmFromQM":
				break;
			case "SendToTmFRomTransferHead":
				Mailer.SendToTmFRomTransferHead(
						GetTmInfo(tmId), type,
						agentName, start_date, newTarget, quarter, year,
						tmNames, reasonTm);
				break;
			case "sendtopsm":
				Mailer.SendToPSM(to, tmNames, agentName, quarter, year);
				break;
			default:

				String result = "{\"return\":\"error\"}";
			}

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private String GetTmInfo(String tmId) {
		String tmEmail = null;
		PreparedStatement st = null;
		java.sql.Connection conn = null;
		ResultSet data = null;
		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");
			String sql = "SELECT tm_email FROM  hdpr.tbl_roster_tm_mapping WHERE tm_employee_id =?";
			st = conn.prepareStatement(sql);
			st.setString(1, tmId);
			data = st.executeQuery();
			while (data.next()) {
				tmEmail = data.getString("tm_email");
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (NullPointerException e) {

			e.getMessage();
		}

		return tmEmail;

	}

}
