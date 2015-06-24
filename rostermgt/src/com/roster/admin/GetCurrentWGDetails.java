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
 * Servlet implementation class GetCurrentWGDetails
 */
//getcurrentworkgroupperspecialist
@WebServlet("/gcwdps")
public class GetCurrentWGDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetCurrentWGDetails() {
		super();

	}
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		String sql;
		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
   
			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_id = (jsonObj.getString("emp_id") == null) ? ""
					: jsonObj.getString("emp_id");
			String is_latest = (jsonObj.getString("is_latest") == null) ? ""
					: jsonObj.getString("is_latest");
			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if(is_latest.equals("yes")){
			sql = " select emp_name,serial_emp_wg_mapping, wg_names, b.start_date, b.end_date ";
			sql = sql + " from hdpr.tbl_roster_employees a ";
			sql = sql + " INNER JOIN hdpr.tbl_roster_emp_wg_mapping b ";
			sql = sql + " ON a.emp_id = b.emp_id  "
					+ " WHERE a.emp_id = '" + emp_id +"' AND is_current='1' ORDER BY b.start_date DESC";
			}else{
				sql = " select emp_name, serial_emp_wg_mapping,wg_names, b.start_date, b.end_date ";
				sql = sql + " from hdpr.tbl_roster_employees a ";
				sql = sql + " INNER JOIN hdpr.tbl_roster_emp_wg_mapping b ";
				sql = sql + " ON a.emp_id = b.emp_id  "
						+ " WHERE a.emp_id = '" + emp_id +"' AND  is_current='0' AND end_date is not null ORDER BY b.start_date DESC";
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
			response.getWriter().write((e).toString() + "badtrip naman oh");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally{
			if(conn != null){
				try {
					conn.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}
		}
	}

}
