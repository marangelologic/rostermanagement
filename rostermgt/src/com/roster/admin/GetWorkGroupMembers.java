package com.roster.admin;

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

/**
 * Servlet implementation class GetWorkGroupMembers
 */
@WebServlet("/gwgm")
public class GetWorkGroupMembers extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetWorkGroupMembers() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String wgName = (jsonObj.getString("wg_names") == null) ? ""
					: jsonObj.getString("wg_names");
			String tm_id = (jsonObj.optString("tm_id",""));
			String role = (jsonObj.optString("role",""));
			java.sql.Connection conn = null;

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			
			String sql = "";
			if(role.equals("21232f297a57a5a743894a0e4a801fc3")){
			 sql = " SELECT a.emp_id, emp_name,start_date from hdpr.tbl_roster_employees a INNER JOIN hdpr.tbl_roster_emp_wg_mapping b ON a.emp_id = b.emp_id WHERE end_date IS NULL AND b.wg_names ='"
					+ wgName + "' ORDER BY emp_name ASC";
			}else{
			 sql = " SELECT a.emp_id, emp_name,b.start_date from hdpr.tbl_roster_employees a INNER JOIN hdpr.tbl_roster_emp_wg_mapping b ON a.emp_id = b.emp_id "
					 + "INNER JOIN hdpr.tbl_roster_emp_tm_mapping c ON c.emp_id = a.emp_id WHERE b.end_date IS NULL AND b.wg_names ='"
						+ wgName + "' AND c.tm_id='" + tm_id +"' AND b.is_current='1'  ORDER BY emp_name ASC";  
			}
			PreparedStatement st = conn.prepareCall(sql);

			ResultSet data;
			data = st.executeQuery();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(data).toString());

			try {
				st.close();

			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();

			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((e).toString() + " badtrip naman oh");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		}
	}

}
