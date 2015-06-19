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
 * Servlet implementation class addUpdateCurrentTmEmployee
 */
@WebServlet("/auctmi")
public class addUpdateCurrentTmEmployee extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public addUpdateCurrentTmEmployee() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String sqlUpdate;
		String sqlInsert;
		java.sql.Connection conn = null;
		try {
			
			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_is_new = (jsonObj.getString("emp_is_new") == null) ? ""
					: jsonObj.getString("emp_is_new");
			String emp_id = (jsonObj.getString("emp_id") == null) ? ""
					: jsonObj.getString("emp_id");
			String tm_id = (jsonObj.getString("tm_id") == null) ? "" : jsonObj
					.getString("tm_id");
			String new_tm_id = (jsonObj.getString("new_tm_id") == null) ? ""
					: jsonObj.getString("new_tm_id");
			String new_start_date = (jsonObj.getString("new_start_date") == null) ? ""
					: jsonObj.getString("new_start_date");
			String curr_end_date = (jsonObj.getString("curr_end_date") == null) ? ""
					: jsonObj.getString("curr_end_date");
			String cur_start_date = (jsonObj.getString("cur_start_date") == null) ? ""
					: jsonObj.getString("cur_start_date");

			//javax.naming.InitialContext ctx = null;

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace(); 
			}
//0017230a

			sqlUpdate = " UPDATE hdpr.tbl_roster_emp_tm_mapping SET end_date = "
					+ ((curr_end_date.equals("")) ? null + "" : "'"
							+ curr_end_date + "',is_current_tm='0'")
					+ " WHERE tm_id = '"
					+ tm_id
					+ "' AND emp_id ='"
					+ emp_id
					+ "' AND is_current_tm='1' AND start_date ="
					+ ((cur_start_date.equals("")) ? null + "" : "'"
							+ cur_start_date + "'");

			sqlInsert = " INSERT INTO hdpr.tbl_roster_emp_tm_mapping(\"tm_id\",\"emp_id\",\"start_date\",\"is_current_tm\") VALUES ";
			sqlInsert = sqlInsert + "('" + new_tm_id + "',";
			sqlInsert = sqlInsert + "'" + emp_id + "',";
			sqlInsert = sqlInsert + "'" + new_start_date + "','1')";
			try{
				CallableStatement st = conn.prepareCall(sqlUpdate);
				st.executeUpdate();
			}catch(Exception e){
				e.printStackTrace();
			}
			CallableStatement sts = conn.prepareCall(sqlInsert);

			sts.executeUpdate();

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write("{\"success\":\"success\"}");

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
			response.getWriter().write(
					(e).toString() + " sql e");
		} catch (JSONException f) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((f).toString());
		} catch (NullPointerException g) {
			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write((g).toString());
		}finally{
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
