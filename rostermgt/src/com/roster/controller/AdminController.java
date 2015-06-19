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
import com.roster.admin.ResultSetConverter;

/**
 * Servlet implementation class AdminController
 */
@WebServlet("/adcntrl")
public class AdminController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AdminController() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */

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
				
				// java.sql.Driver d = new com.po
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
				// st = conn.createStatement();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			/*
			 * javax.sql.DataSource ds = (javax.sql.DataSource) ctx
			 * .lookup("mylocalconnection2"); conn = ds.getConnection();
			 */

			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");

			switch (signature) {
			case "gettenureperprodfam":
				sql = AdminModel.GetTenurePerProdFam();
				break;
			case "getavetenureperprodfam":
				sql = AdminModel.GetAveTenurePerProdFam();
				break;
			case "getpipeline":
				sql = AdminModel.GetHeadsPipeLinePerWorkgroups();
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
			/*
			 * } catch (NamingException e) { // TODO Auto-generated catch block
			 * e.printStackTrace();
			 */
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
