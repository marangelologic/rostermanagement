package com.roster.admin;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class UpdateEmployeeInfo
 */
@WebServlet("/usis")
public class UpdateEmployeeInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UpdateEmployeeInfo() {
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
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_is_update = (jsonObj.getString("emp_is_update") == null) ? ""
					: jsonObj.getString("emp_is_update");
			String emp_id = (jsonObj.getString("emp_id") == null) ? ""
					: jsonObj.getString("emp_id");
			String emp_name = (jsonObj.getString("emp_name") == null) ? ""
					: jsonObj.getString("emp_name");
			String emp_email = (jsonObj.getString("emp_email") == null) ? ""
					: jsonObj.getString("emp_email");
			String emp_role = (jsonObj.getString("emp_role") == null) ? ""
					: jsonObj.getString("emp_role");
			String emp_prod_fam = (jsonObj.getString("emp_prod_fam") == null) ? ""
					: jsonObj.getString("emp_prod_fam");
			String emp_location = (jsonObj.getString("emp_location") == null) ? ""
					: jsonObj.getString("emp_location");
			String emp_center = (jsonObj.getString("emp_center") == null) ? ""
					: jsonObj.getString("emp_center");
			String emp_hire_date = (jsonObj.getString("emp_hire_date") == null) ? ""
					: jsonObj.getString("emp_hire_date");
			String emp_res_date = (jsonObj.getString("emp_res_date") == null) ? ""
					: jsonObj.getString("emp_res_date");
			String emp_is_training = (jsonObj.getString("emp_is_training") == null) ? ""
					: jsonObj.getString("emp_is_training");
			String emp_training_start_date = (jsonObj
					.getString("emp_training_start_date") == null) ? ""
					: jsonObj.getString("emp_training_start_date");
			String emp_training_end_date = (jsonObj
					.getString("emp_training_end_date") == null) ? "" : jsonObj
					.getString("emp_training_end_date");

			String taleono = (jsonObj.getString("taleono") == null) ? ""
					: jsonObj.getString("taleono");
			String emp_type = (jsonObj.getString("emp_type") == null) ? ""
					: jsonObj.getString("emp_type");
			String portal_role = (jsonObj.getString("portal_role") == null) ? ""
					: jsonObj.getString("portal_role");

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			String sql = "";

			if (emp_is_update.equals("1")) {
				sql = " UPDATE hdpr.tbl_roster_employees ";
				sql = sql + " set emp_name = '" + emp_name + "', ";
				sql = sql + " email = '" + emp_email + "', emp_portal_role='"
						+ portal_role + "', ";
				sql = sql + " role = '" + emp_role + "', ";
				sql = sql + " emp_status = '" + emp_type + "', ";
				sql = sql + " emp_product_family = '" + emp_prod_fam + "', ";
				sql = sql + " emp_center = '" + emp_center + "', ";
				sql = sql + " emp_location = '" + emp_location + "', ";
				sql = sql + " emp_is_training = '" + emp_is_training + "', ";
				sql = sql + " emp_training_end_date = '"
						+ emp_training_end_date + "', ";
				sql = sql + " emp_training_start_date = '"
						+ emp_training_start_date + "', ";
				sql = sql
						+ " emp_hired_date = "
						+ ((emp_hire_date.equals("")) ? null : "'"
								+ emp_hire_date + "'") + ", ";
				sql = sql
						+ " emp_resigned_date = "
						+ ((emp_res_date.equals("")) ? null : "'"
								+ emp_res_date + "'") + " WHERE ";
				sql = sql + " emp_id = '" + emp_id + "'; commit;";
			} else {
				sql = sql + returnSQLStatement(emp_type);
				sql = sql + "('" + emp_id + "', ";
				sql = sql + "'" + emp_name + "', ";
				sql = sql + "'" + emp_email + "', ";
				sql = sql + "'" + emp_role + "', ";
				sql = sql + "'" + emp_prod_fam + "', ";
				sql = sql + "'" + emp_center + "', ";
				sql = sql + "'" + emp_location + "', ";
				sql = sql + "'" + emp_is_training + "', ";
				sql = sql + "'" + emp_training_start_date + "', ";
				sql = sql + "'1', ";
				sql = sql + "'1', ";
				sql = sql + "'" + emp_training_end_date + "', ";
				sql = sql + "'" + emp_hire_date + "','" + taleono + "','"
						+ emp_type + "','" + portal_role + "'); commit;";
			}

			CallableStatement st = conn.prepareCall(sql);
				
			st.executeUpdate(); 

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write("{\"success\":\"success\"}");

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
			if (conn == null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

	private String returnSQLStatement(String emp_status) {
		String sql = "";
		switch (emp_status) {
		case "Contractual":
			sql = sql
					+ " INSERT INTO hdpr.tbl_roster_employees(\"emp_id\",\"emp_name\",\"email\",\"role\",\"emp_product_family\",\"emp_center\",\"emp_location\", ";
			sql = sql
					+ "\"emp_is_training\",\"emp_training_start_date\",\"emp_is_hd\",\"emp_is_active\",\"emp_training_end_date\",\"emp_hired_date\",\"emp_req_num\",\"emp_status\",\"emp_portal_role\") VALUES ";
			break;
		case "Permanent":
			sql = sql
					+ " INSERT INTO hdpr.tbl_roster_employees(\"emp_id\",\"emp_name\",\"email\",\"role\",\"emp_product_family\",\"emp_center\",\"emp_location\", ";
			sql = sql
					+ "\"emp_is_training\",\"emp_training_start_date\",\"emp_is_hd\",\"emp_is_active\",\"emp_training_end_date\",\"emp_hired_date\",\"emp_req_num\",\"emp_status\",\"emp_portal_role\") VALUES ";
			break;
		case "Training":
			sql = sql
					+ " INSERT INTO hdpr.tbl_roster_employees(\"emp_id\",\"emp_name\",\"email\",\"role\",\"emp_product_family\",\"emp_center\",\"emp_location\", ";
			sql = sql
					+ "\"emp_is_training\",\"emp_training_start_date\",\"emp_is_hd\",\"emp_is_active\",\"emp_training_end_date\",\"emp_hired_date\",\"emp_req_num\",\"emp_status\",\"emp_portal_role\") VALUES ";
			break;
		case "Leave":
			sql = sql
					+ " INSERT INTO hdpr.tbl_roster_employees(\"emp_id\",\"emp_name\",\"email\",\"role\",\"emp_product_family\",\"emp_center\",\"emp_location\", ";
			sql = sql
					+ "\"emp_is_training\",\"emp_leave_start_date\",\"emp_is_hd\",\"emp_is_active\",\"emp_leave_end_date\",\"emp_hired_date\",\"emp_req_num\",\"emp_status\",\"emp_portal_role\") VALUES ";
			break;
		default:
			sql = sql
			+ " INSERT INTO hdpr.tbl_roster_employees(\"emp_id\",\"emp_name\",\"email\",\"role\",\"emp_product_family\",\"emp_center\",\"emp_location\", ";
	sql = sql
			+ "\"emp_is_training\",\"emp_training_start_date\",\"emp_is_hd\",\"emp_is_active\",\"emp_training_end_date\",\"emp_hired_date\",\"emp_req_num\",\"emp_status\",\"emp_portal_role\") VALUES ";
			break;
		}
		return sql;
	}


}
