var holders = function()
{
	var holder = []
	
	this.add = function(input)
	{
		holder.push(input)
	}
	
	this.show = function()
	{
		return(holder)
	}
}

Transaktioner = new holders()

/*
var Account = function(id, owner)
{
	var id = id;
	var owner = owner;
	var balance = 10000;
	
	this.transfer = function(toId, amount)
	{
		//hvis findes id
		if(amount > 0 && balance >= amount)
		{
			balance = balance - amount
			Transaktioner.add({"from": id, "to": toId, "amount": amount})
		}
		else{throw("Error")}
	}
	this.getBalance = function()
	{
		return(balance)
	}
}
**/

var konto = function(id, saldo, ejer, rentefod)
{
	if(typeof(id) == "number", typeof(saldo) == "number", typeof(ejer) == "string")
	{
		var that = {}
		
		var id = id;
		var saldo = saldo;
		var ejer = ejer;
		var rentefod = rentefod;
		
		Object.defineProperty
		(
			that, "saldo", 
			{
				"get": function()
				{
					return(saldo)
				}
				//"set": function() {}
			}
		)
	}
	else{throw("Fejl i enten id'et eller saldo'en eller ejer")}
	
	return(that)
}
