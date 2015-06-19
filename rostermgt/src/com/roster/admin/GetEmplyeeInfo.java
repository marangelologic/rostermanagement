package com.roster.admin;

import java.io.IOException;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;



@WebServlet("/empinfo")
public class GetEmplyeeInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetEmplyeeInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		try {
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");
   
			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_id = (jsonObj.getString("emp_id") == null) ? ""
					: jsonObj.getString("emp_id");

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String sql = "select b.start_date as \"emp_tm_start_date\", b.end_date as \"emp_tm_end_date\", ";
			sql = sql + "(select tm_name from hdpr.tbl_roster_tm_mapping WHERE tm_employee_id = b.tm_id AND is_current_tm='1') as \"tm_name\", "
					+ "(select tm_employee_id from hdpr.tbl_roster_tm_mapping WHERE tbl_roster_tm_mapping.tm_employee_id = b.tm_id AND is_current_tm='1') as \"tm_id\",  a.* ";
			sql = sql + "from hdpr.tbl_roster_employees a LEFT OUTER JOIN ";
			sql = sql + "hdpr.tbl_roster_emp_tm_mapping b ON a.emp_id = b.emp_id "
					+ "WHERE a.emp_id = '" + emp_id + "' AND is_current_tm='1' ORDER BY b.start_date";

			PreparedStatement st = conn.prepareCall(sql);

			ResultSet data;
			data = st.executeQuery();
			
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
		} finally {
			try {
				conn.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
	}

}
