package com.admin.model;

import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class guaccess
 */
@WebServlet("/guaccess")
public class guaccess extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public guaccess() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String sqlUpdate = null;
		java.sql.Connection conn = null;
		ResultSet data = null;
		String role = null;
		String returns;
		try {

			String is = request.getParameterMap().toString();
			String paraNames[] = is.split("=");
			String jsonParameters = (paraNames[0] + "}").replace("{{", "{")
					.replace("}}", "}");

			JSONObject jsonObj = new JSONObject(jsonParameters);

			String emp_id = (jsonObj.optString("emp_id",""));

			try {
				conn = DriverManager.getConnection(
						"jdbc:postgresql://10.91.22.235:5432/reporting",
						"postgres", "P0stgres");
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			sqlUpdate = AdminModel.GetUserAccess(emp_id);
			CallableStatement st = conn.prepareCall(sqlUpdate);
			data = st.executeQuery();

			while (data.next()) {
				role = data.getString("role");
			}

			if ((role).equals("admin")) {
				returns = "[{\"a\":\"21232f297a57a5a743894a0e4a801fc3\"}]";
			}else if(role.equals("quality")){
				returns = "[{\"a\":\"d66636b253cb346dbb6240e30def3618\"}]";
				
			} else if (role.equals("team manager")) {
				returns = "[{\"a\":\"1d0258c2440a8d19e716292b231e3190\"}]";
			} else {
				returns = "[{\"a\":\"b33aed8f3134996703dc39f9a7c95783\"}]";
			}

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(returns);

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
