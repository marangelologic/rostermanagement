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

import com.roster.controller.EmployeeSignatures;

/**
 * Servlet implementation class EmployeeServlet
 */
@WebServlet("/empcontroller")
public class EmployeeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public EmployeeServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		java.sql.Connection conn = null;
		PreparedStatement st = null;
		ResultSet data = null;
		try {

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

			String emp_id = (jsonObj.optString("emp_id"));
			String signature = (jsonObj.getString("signature") == null) ? ""
					: jsonObj.getString("signature");
			String old_id = jsonObj.optString("old_id", "");
			String sDate = jsonObj.optString("sDate", "");
			String taleo = jsonObj.optString("old_id", "");
			String eDate = jsonObj.optString("eDate", "");

			String emp_name = jsonObj.optString("emp_name", "");
			String currentStatus = jsonObj.optString("type", "");
			String serial_id = jsonObj.optString("serial_id", "");
			String subType = jsonObj.optString("subType", "");
			String position = jsonObj.optString("position", "");

			String sql;
			switch (signature) {
			case "getroles":
				sql = EmployeeSignatures.GetAllRoles(emp_id);
				break;
			case "getAllroles":
				sql = EmployeeSignatures.GetAllRolses();
				break;
			case "getAllresignedemp":
				sql = EmployeeSignatures.GetAllResignedEmp();
				break;
			case "getportalroles":
				sql = EmployeeSignatures.GetPortalRoles();
				break;
			case "updatereplacemapping":
				sql = EmployeeSignatures.UpdateResignedEmployeesStatus(emp_id);
				break;
			case "addempattrib":
				sql = EmployeeSignatures.AddtoPromotedList(emp_id, old_id,
						sDate, taleo,position);
				break;
			case "addtotablestatus":
				sql = EmployeeSignatures.AddToTableStatus(currentStatus,
						emp_id, sDate, eDate, emp_name, subType);
				break;
			case "getdetailattribute":
				sql = EmployeeSignatures.GetAttribute(emp_id);
				break;
			case "updateattribute":
				sql = EmployeeSignatures.UpdateAttribute(emp_id, serial_id, sDate, eDate);
				break;	
			case "makeattributehistorical":
				sql = EmployeeSignatures.MakeAttibuteHistorical(emp_id);
				break;
			case "getqmemployees":
				sql = EmployeeSignatures.GetAllEmployeeForQM();
				break;	
			default:
				sql = "SELECT 'DEAFAULT'";
				break;
			}

			st = conn.prepareCall(sql);
			data = st.executeQuery();				

			response.setContentType("application/json");
			response.setCharacterEncoding("utf-8");
			response.getWriter().write(
					ResultSetConverter.convert(data).toString());

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

	private static String JSON(String[] args) {
		String mar = "";
		for (String string : args) {
			mar = mar + string;
		}
		return mar;
	}

}
