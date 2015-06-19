package com.roster.controller;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.admin.model.AdminModel;
import com.psm.model.PSMModel;
import com.roster.admin.ResultSetConverter;

@WebServlet("/qmcontroller")
public class QuickMenuController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public QuickMenuController() {
		super();
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		String sql;
		try {

			javax.naming.InitialContext ctx = null;
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);
			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace(); 
			}
			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");

			String rolename = (jsonObj.getString("rolename") == null) ? ""
					: jsonObj.getString("rolename");
			String psmempId = (jsonObj.getString("psmempId") == null) ? ""
					: jsonObj.getString("psmempId");
			String psmFname = (jsonObj.getString("psmFname") == null) ? ""
					: jsonObj.getString("psmFname");
			String psmLName = (jsonObj.getString("psmLName") == null) ? ""
					: jsonObj.getString("psmLName");
			String psmHiredDate = (jsonObj.getString("psmHiredDate") == null) ? ""
					: jsonObj.getString("psmHiredDate");
			String psmEmail = (jsonObj.getString("psmEmail") == null) ? ""
					: jsonObj.getString("psmEmail");
			String centerName = (jsonObj.getString("centerName") == null) ? ""
					: jsonObj.getString("signature");
			String prodFamName = (jsonObj.getString("prodFamName") == null) ? ""
					: jsonObj.getString("prodFamName");

			switch (signature) {
			case "getpsmlist":
				sql = PSMModel.GetPSMList();
				break;
			default:
				sql = "default";
				break;
			}

			st = conn.prepareCall(sql);
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			if (data.equals("") || data.equals(null)) {
				response.getWriter().write(
						("\"success\":\"success\"").toString());
			} else {
				response.getWriter().write(
						ResultSetConverter.convert(data).toString());
			}
			try {
				st.close();
				data.close();
			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();

			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			if (e.toString()
					.equalsIgnoreCase(
							"org.postgresql.util.PSQLException: No results were returned by the query.")) {
				response.getWriter().write("{\"success\":\"success\"}");
			} else {
				response.getWriter().write((e).toString() + "badtrip naman oh");
			}
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally {
			try {
				st.close();
			} catch (Exception e) { /* ignored */
			}
			try {
				data.close();
			} catch (Exception e) { /* ignored */
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
