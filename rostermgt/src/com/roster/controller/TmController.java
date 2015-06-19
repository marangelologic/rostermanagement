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

import com.roster.admin.ResultSetConverter;
import com.tm.model.TmModel;
import com.workgroup.model.workGroupController;

/**
 * Servlet implementation class TmController
 */
@WebServlet("/tmrequest")
public class TmController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public TmController() {
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
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");
			String tmname = (jsonObj.optString("tmname",""));
			String tmId = (jsonObj.optString("tmId",""));
			String tm_is_active = (jsonObj.optString("tm_is_active",""));
			String tm_wg_name = (jsonObj.optString("tm_wg_name", ""));
			String tm_wg_start_date = (jsonObj.optString("tm_wg_start_date",""));
			String tm_wg_end_date = (jsonObj.optString("tm_wg_end_date",""));
			String tmEmail = (jsonObj.optString("tmEmail",""));
			String hired = (jsonObj.optString("hired_date",""));
			String resigned = (jsonObj.optString("resigned_date",""));
			
			switch (signature) {
			case "gettmlist":
				sql = TmModel.GetTMList(tmId, tmname);
				break;  
			case "gettmdetailinfo":
				sql = TmModel.GetTMInfo(tmId);
				break;
			case "updatetminfo":
				sql = TmModel.TMUpdateInfo(tmname, tmEmail, tmId, resigned, hired);
				break;
			case "updatetmwg":
				sql = TmModel.addTMWorkgroups(tm_wg_name, tm_wg_start_date,
						tm_wg_end_date, tmId);
				break;  
			case "addtmwg":
				sql = TmModel.addTMWorkgroups(tm_wg_name, tm_wg_start_date,
						tm_wg_end_date, tmId);
				break;  
			case "deletetmwginfo":
				sql = TmModel.DeletetmWG(tmId);
				break;
			case "addtminfo":
				sql = TmModel.AddTmInfo(tmId, tmname, tmEmail,hired);
				break;
			case "deletetm":
				sql = TmModel.DeleteTM(tmId);
				break;
			case "gettmpsmemail":
				sql = TmModel.GetPSMEmail(tmId);
				break;
			case "getinterrimtm":
				sql = TmModel.GetInterimTMList(); 
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
						("{\"success\":\"success\",\"sql\":\"" + sql+ "\"}").toString());
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
