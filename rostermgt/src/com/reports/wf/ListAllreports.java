package com.reports.wf;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.admin.model.AdminModel;
import com.roster.admin.ResultSetConverter;

/**
 * Servlet implementation class ListAllreports
 */
@WebServlet("/lar")
public class ListAllreports extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ListAllreports() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		String sql = "";
		try {

			javax.naming.InitialContext ctx = null;
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);
			
			String reportType = jsonObj.optString("reportType","");
			try {

				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			switch(reportType){
			case "workforce":
				sql = "SELECT * FROM hdpr.tbl_roster_wf_reports WHERE report_type = 'workforce'";
				break;
			case "quality":
				sql = "SELECT * FROM hdpr.tbl_roster_wf_reports WHERE report_type = 'quality'";
				break;
			default:
				sql = "SELECT 'default error'";
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
			} catch (Exception e) {
			}
			try {
				data.close();
			} catch (Exception e) {
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
