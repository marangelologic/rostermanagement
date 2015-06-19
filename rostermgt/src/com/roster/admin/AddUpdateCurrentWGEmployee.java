package com.roster.admin;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class AddUpdateCurrentWGEmployee
 */
@WebServlet("/aucwgi")
public class AddUpdateCurrentWGEmployee extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public AddUpdateCurrentWGEmployee() {
		super();
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		try {
			String sqlUpdate;
			String sqlInsert;
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_is_new = (jsonObj.getString("emp_is_new") == null) ? ""
					: jsonObj.getString("emp_is_new");
			String emp_id = (jsonObj.getString("emp_id") == null) ? ""
					: jsonObj.getString("emp_id");
			String wgName = (jsonObj.getString("wgName") == null) ? ""
					: jsonObj.getString("wgName");
			String new_wg_name = (jsonObj.getString("new_wg_name") == null) ? ""
					: jsonObj.getString("new_wg_name");
			String new_start_date = (jsonObj.getString("new_start_date") == null) ? ""
					: jsonObj.getString("new_start_date");
			String curr_end_date = (jsonObj.getString("curr_end_date") == null) ? ""
					: jsonObj.getString("curr_end_date");
			String cur_start_date = (jsonObj.getString("cur_start_date") == null) ? ""
					: jsonObj.getString("cur_start_date");

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			sqlUpdate = " UPDATE hdpr.tbl_roster_emp_wg_mapping SET end_date = "
					+ ((curr_end_date.equals("")) ? null : "'" + curr_end_date
							+ "'")
					+ ",is_current='0'"
					+ " WHERE emp_id ='"
					+ emp_id + "' AND is_current='1'; commit;";

			sqlInsert = " INSERT INTO hdpr.tbl_roster_emp_wg_mapping(\"wg_names\",\"emp_id\",\"start_date\",\"is_current\") VALUES ";
			sqlInsert = sqlInsert + "('" + new_wg_name + "',";
			sqlInsert = sqlInsert + "'" + emp_id + "',";
			sqlInsert = sqlInsert + "'" + new_start_date + "','1'); commit;";

			CallableStatement st = conn.prepareCall(sqlUpdate);
			st.executeUpdate();

			CallableStatement sts = conn.prepareCall(sqlInsert);
			sts.executeUpdate();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					"{\"success\":\"success\"}");

			try {
				sts.close();

			} catch (SQLException logOrIgnore) {

			}
			try {
				conn.close();
			} catch (SQLException logOrIgnore) {

			}

		} catch (SQLException e) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((e).toString() + " sql e");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (Exception e) {
					// TODO: handle exception
				}
			}

		}
	}

}
