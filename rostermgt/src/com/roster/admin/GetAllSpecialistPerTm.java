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
 * Servlet implementation class GetAllSpecialistPerTm
 */
@WebServlet("/GetAllSpecialistPerTm")
public class GetAllSpecialistPerTm extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public GetAllSpecialistPerTm() {
		super();

	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
			java.sql.Connection conn = null;
		
		try {
			String is = request.getParameterMap().toString(); String
			  paraNames[] = is.split("="); String jsonParameters =
			  (paraNames[0] + "}").replace("{{", "{") .replace("}}", "}");
			  
			  JSONObject jsonObj = new JSONObject(jsonParameters);
			  
			  String tm_id = (jsonObj.getString("tm_id") == null) ? "" : jsonObj.getString("tm_id");  
			  try {
					conn = DriverManager.getConnection(
							"jdbc:postgresql://10.91.22.235:5432/reporting",
							"postgres", "P0stgres");
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			String sql = "select * from hdpr.tbl_roster_emp_tm_mapping a ";
			sql = sql + " INNER JOIN hdpr.tbl_roster_employees b ON a.emp_id = b.emp_id ";
			sql = sql + " LEFT JOIN hdpr.tbl_roster_scores c ON b.emp_id = c.emp_id  ";
			sql = sql + " where a.tm_id = '" + tm_id +"'";
			
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
